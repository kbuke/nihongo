# Remote library imports
from flask import request, make_response, session, render_template, url_for
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users, Admin, Traveler, Citizen, Prefecture, LocalBusinessSites, BusinessReviews, RegisteredBusinessTypes, BusinessTypes, PrefectureCategories, PrefectureCategoryReviews, CheckInPrefecture, PrefectureWishList
from sqlalchemy import event

#Show all available users, and allow frontend to add new ones
class AllUsers(Resource):
    def get(self):
        users = [user.to_dict(
            rules=(
                "-_password_hash",
                "-user", 
                "-admins", 
                "-travelers", 
                "-citizens",
                "-businesses",
                "-prefecture",
            )) for user in Users.query.all()]
        return users, 200
    
    def post(self):
        json = request.get_json()
        role = json.get("newUserRole")
        # breakpoint()
        try:
            if role == "Admin":
                new_user = Admin(
                    username = json.get("newUserName"),
                    user_info = json.get("newUserInfo"),
                    profile_picture = json.get("newUserPic"),
                    role = role,
                    hometown = json.get("newUserHomeTown"),
                    home_country = json.get("newUserHomeCountry")
                )

            elif role == "Traveller":
                new_user = Traveler(
                    username = json.get("newUserName"),
                    user_info = json.get("newUserInfo"),
                    profile_picture = json.get("newUserPic"),
                    role = role,
                    hometown = json.get("newUserHomeTown"),
                    home_country = json.get("newUserHomeCountry")
                )
            
            elif role == "Citizen":
                new_user = Citizen(
                    username = json.get("newUserName"),
                    user_info = json.get("newUserInfo"),
                    profile_picture = json.get("newUserPic"),
                    role = role,
                    hometown = json.get("newUserHomeTown"),
                    home_country = json.get("newUserHomeCountry"),
                    current_town = json.get("newUserCurrentTown")
                )

            new_user.password = json.get("newUserPassword")
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(rules=(
                "-_password_hash",
                "-user", 
                "-admins", 
                "-travelers", 
                "-citizens",
                "-businesses",
                "-prefecture",
            )), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

#Show Users based on their id
class UsersId(Resource):
    def get(self, id):
        user_info = Users.query.filter(Users.id==id).first()
        if user_info:
            return make_response(user_info.to_dict(
                rules=(
                    "-user", 
                    "-admins", 
                    "-travelers", 
                    "-citizens",
                    "-businesses",)
            ), 201)
        return {
            "error": "user not found"
        }

#Show all registered admins
class AllAdministrators(Resource):
    def get(self):
        admins = [admin.to_dict(
            rules=(
                "-_password_hash",
                "-user", 
                "-admins", 
                "-travelers", 
                "-citizens", 
                "-businesses",   
            )) for admin in Admin.query.all()]
        return admins, 200

class AdminsId(Resource):
    def get(self, id):
        admin_info = Admin.query.filter(Admin.id==id).first()
        if admin_info:
            return make_response(admin_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",
                    "-business_reviews.admin",
                    "-business_reviews.citizen",
                    "-business_reviews.traveler",
                    "-business_reviews.business",
                    "-_password_hash",    
                )
            ), 201)
        return {
            "error": "admin not found"
        }, 404

#Show all travelers
class AllTravelers(Resource):
    def get(self):
        travelers = [traveler.to_dict(
            rules=(
                "-_password_hash",
                "-user",
                "-admins",
                "-travelers",
                "-citizens",
                "-businesses",
            )) for traveler in Traveler.query.all()]
        return travelers, 200

class TravelersId(Resource):
    def get(self, id):
        traveler_info = Traveler.query.filter(Traveler.id==id).first()
        if traveler_info:
            # breakpoint()
            return make_response(traveler_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",
                    "-business_reviews.admin",
                    "-business_reviews.citizen",
                    "-business_reviews.traveler",
                    "-business_reviews.business",
                )
            ), 201)
        return {"error": "traveler not found"}, 404

#Show all citizens
class AllCitizens(Resource):
    def get(self):
        citizens = [citizen.to_dict(
            rules=(
                "-password_hash",
                "-user",
                "-admins",
                "-travelers",
                "-citizens",
            )
        ) for citizen in Citizen.query.all()]
        return citizens, 200

class CitizensId(Resource):
    def get(self, id):
        citizen_info = Citizen.query.filter(Citizen.id==id).first()
        if citizen_info:
            return make_response(citizen_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",)
            ), 201)
        return {"error": "Citizen not found"}, 404

class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json.get("signInName")
        password = json.get("signInPassword")

        if not username or not password:
            return {"error": "Username and Password required"}, 400
        
        user = Users.query.filter(Users.username == username).first()
        # breakpoint()

        if user and user.authenticate(password):
            session['user_id'] = user.id 
            return user.to_dict(rules=(
                "-admins",
                "-citizens",
                "-travelers",
                "-business_reviews",
                "-businesses",
                "-user",
            )), 200
        
        return {'error': "Invalid username or password"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            if user:
                return user.to_dict(
                    rules=(
                        "-admins",
                        "-citizens",
                        "-travelers",
                        "-business_reviews",
                        "-businesses",
                        "-user",
                        "-prefectures",
                    )
                ), 200
        return {"message": "Unauthorized user"}, 401

class LogOut(Resource):
    def delete(self):
        user_id = session.get('user_id')
        if user_id:
            session.pop('user_id')
            return {}, 204
        return {"message": "Unautjorized"}, 401

class AllPrefectures(Resource):
    def get(self):
        prefectures = [prefecture.to_dict(rules=(
            "-businesses",
        )) for prefecture in Prefecture.query.all()]
        return prefectures, 200

class PrefectureId(Resource):
    def get(self, id):
        prefecture_info = Prefecture.query.filter(Prefecture.id==id).first()
        if prefecture_info:
            # breakpoint()
            return make_response(prefecture_info.to_dict(
                rules=(
                    "-businesses.prefecture",
                    "-businesses.admins",
                    "-businesses.travelers",
                    "-businesses.citizens",
                    "-businesses.businesses",
                    "-businesses.user",
                    "-businesses._password_hash",

                    "-businesses.business_reviews.business",
                    "-businesses.business_reviews.admin",
                    "-businesses.business_reviews.traveler",
                    "-businesses.business_reviews.citizen",
                    "-businesses.business_reviews.admin_id",
                    "-businesses.business_reviews.business_id",
                    "-businesses.business_reviews.citizen_id",
                    "-businesses.business_reviews.id",
                    "-businesses.business_reviews.review_comment",
                    "-businesses.business_reviews.review_date",
                    "-businesses.business_reviews.traveler_id",

                    "-businesses.business_types.business",
                    "businesses.business_types.registered_type",
                    "-businesses.building_numbers",
                    "-businesses.closing_time",
                    "-businesses.opening_time",
                    "-businesses.role",
                    "-businesses.type",
                    "-businesses.user_info",
                    "-businesses.username",
                    "-businesses.postal_code",
                )
            ), 201)
        return {
            "errors": "prefecture not found"
        }
    
    def patch(self, id):
        data=request.get_json()
        prefecture_info = Prefecture.query.filter(Prefecture.id==id).first()
        if prefecture_info:
            try:
                for attr in data:
                    setattr(prefecture_info, attr, data[attr])
                db.session.add(prefecture_info)
                db.session.commit()
                return make_response(prefecture_info.to_dict(rules=(
                    "-businesses.prefecture",
                    "-businesses.admins",
                    "-businesses.travelers",
                    "-businesses.citizens",
                    "-businesses.businesses",
                    "-businesses.user",
                    "-businesses._password_hash",
                    "-businesses.business_reviews",
                    "-businesses.business_types.business",
                    "businesses.business_types.registered_type",
                    "-businesses.building_numbers",
                    "-businesses.closing_time",
                    "-businesses.opening_time",
                    "-businesses.role",
                    "-businesses.type",
                    "-businesses.user_info",
                    "-businesses.username",
                    "-businesses.postal_code",
                )), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Prefecture Not Found"
        }, 404

class Businesses(Resource):
    def get(self):
        businesses = [business.to_dict(
            rules=(
                "-_password_hash",
                "-user",
                "-admins",
                "-travelers",
                "-citizens",
                "-businesses",
                "-prefectures",
                "-prefecture",
            )) for business in LocalBusinessSites.query.all()]
        return businesses, 200

class BusinessesId(Resource):
    def get(self, id):
        business_info = LocalBusinessSites.query.filter(LocalBusinessSites.id==id).first()
        if business_info:
            # breakpoint()
            return make_response(business_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",
                    "-businesses",
                    "business_reviews",
                    "-business_types.business",
                    "-business_types.registered_type.business_types",
                )
            ), 201)
        return {"error": "Business not found"}

class AllBusinessReviews(Resource):
    def get(self):
        business_reviews = [business_review.to_dict() for business_review in BusinessReviews.query.all()]
        return business_reviews, 200

class BusinessReviewId(Resource):
    def get(self, id):
        business_review_info = BusinessReviews.query.filter(BusinessReviews.id==id).first()
        if business_review_info:
            # breakpoint()
            return make_response(business_review_info.to_dict(rules=(
                "-admin.business_reviews",
                "-admin.businesses",
                "-admin.user",
                "-admin.citizens",
                "-admin.admins",
                "-admin.travelers",

                "-citizen.business_reviews",
                "-citizen.businesses",
                "-citizen.user",
                "-citizen.citizens",
                "-citizen.admins",
                "-citizen.travelers",


                "-travelers.business_reviews",
                "-travelers.businesses",
                "-travelers.user",
                "-travelers.citizens",
                "-travelers.admins",
                "-travelers.travelers",

                "-business.business_reviews",
                "-business.businesses",
                "-business.user",
                "-business.citizens",
                "-business.admins",
                "-business.travelers",

                "-business._password_hash",
                "-business.building_numbers",
                "-business.city",
                "-business.closing_time",
                "-business.neighbourhood",
                "-business.opening_time",
                "-business.prefecture.population",
                "-business.prefecture.prefecture_flag",
                "-business.prefecture.prefecture_img",
                "-business.prefecture.prefecture_info",
                "-business.prefecture.capital_city",
                "-citizen._password_hash",
                "-citizen.current_town",
                "-citizen.home_country",
                "-citizen.hometown",
                "-citizen.role",
                "-citizen.user_info",

                "-admin._password_hash",
                "-admin.home_country",
                "-admin.hometown",
                "-admin.role",
                "-admin.user_info",
            )), 201)
        return {"error": "Business Review Not Found"}

class AllBusinessTypes(Resource):
    def get(self):
        business_types = [business_type.to_dict() for business_type in RegisteredBusinessTypes.query.all()]
        return business_types, 200

class BusinessTypesId(Resource):
    def get(self, id):
        business_type_info = RegisteredBusinessTypes.query.filter(RegisteredBusinessTypes.id==id).first()
        if business_type_info:
            # breakpoint()
            return make_response(business_type_info.to_dict(rules=(
                "-business_types.registered_type",
                "-business_types.business.business_types",
                "-business_types.business.business_reviews",
                "-business_types.business.citizens",
                "-business_types.business.user",
                "-business_types.business.admins",
                "-business_types.business.travelers",
                "-business_types.business.businesses",
                "-business_types.business.business_types",
                "-business_types.business.business_reviews",
                "-business_types.registered_type.business_types",
                "-business_types.business.prefecture",
            )), 201)
        return {"error": "Business Type not found"}

class AllBusinessTypesConnection(Resource):
    def get(self):
        business_types = [business_type.to_dict() for business_type in BusinessTypes.query.all()]
        return business_types, 200

class AllPrefectureCategories(Resource):
    def get(self):
        category_types = [category_type.to_dict() for category_type in PrefectureCategories.query.all()]
        return category_types, 200

class AllPrefectureRatings(Resource):
    def get(self):
        ratings = [rating.to_dict() for rating in PrefectureCategoryReviews.query.all()]
        return ratings, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_rating = PrefectureCategoryReviews(
                rating = json.get("rating"),
                prefecture_id = json.get("prefectureId"),
                prefecture_type_id = json.get("categoryId"),
                admin_id = json.get("adminId"),
                citizen_id = json.get("citizenId"),
                traveler_id = json.get("travelerId")
            )
            db.session.add(new_rating)
            db.session.commit()
            return new_rating.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class prefectureCheckIn(Resource):
    def get(self):
        checkIns = [checkIn.to_dict() for checkIn in CheckInPrefecture.query.all()]
        return checkIns, 200

    def post(self):
        json = request.get_json()
        try:
            new_checkin = CheckInPrefecture(
                visited = json.get("visited"),
                prefecture_id = json.get("prefectureId"),
                user_id=json.get("userId")
            )
            db.session.add(new_checkin)
            db.session.commit()
            return new_checkin.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400
    
class prefectureCheckInId(Resource):
    def get(self, id):
        check_in_info = CheckInPrefecture.query.filter(CheckInPrefecture.id==id).first()
        if check_in_info:
            # breakpoint()
            return make_response(check_in_info.to_dict(
                rules=(
                    # "-user",
                    "-prefecture",
                )
            ),201)
        return {
            "error": "check in not found"
        }, 404
    
    def delete(self, id):
        check_in = CheckInPrefecture.query.filter(CheckInPrefecture.id==id).first()
        if check_in:
            db.session.delete(check_in)
            db.session.commit()
            return{
                "message": "Prefecture Check In Deleted"
            }, 200
        return{
            "error": "Blog not found"
        }, 404

class PrefectureWishLists(Resource):
    def get(self):
        wishlists = [wishlist.to_dict() for wishlist in PrefectureWishList.query.all()]
        return wishlists, 200
    
    def post(self):
        json = request.get_json()
        # breakpoint()
        try:
            new_wishlist = PrefectureWishList(
                wish_list = json.get("inBag"),
                prefecture_id = json.get("prefectureId"),
                user_id = json.get("userId")
            )
            db.session.add(new_wishlist)
            db.session.commit()
            return new_wishlist.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class PrefectureWishListId(Resource):
    def get(self, id):
        wish_list_info = PrefectureWishList.query.filter(PrefectureWishList.id==id).first()
        if wish_list_info:
            return make_response(wish_list_info.to_dict(), 201)
        return{
            "error": "Wish List not found"
        }, 404 
    
    def delete(self, id):
        wish_list = PrefectureWishList.query.filter(PrefectureWishList.id==id).first()
        if wish_list:
            db.session.delete(wish_list)
            db.session.commit()
            return{
                "message": "Prefecture wish list is Deleted"
            }, 200
        return{
            "error": "Wish List not found"
        }, 404




    


api.add_resource(AllUsers, '/users')
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(AllAdministrators, '/admins')
api.add_resource(AdminsId, '/admins/<int:id>')
api.add_resource(AllTravelers, '/travelers')
api.add_resource(TravelersId, '/travelers/<int:id>')
api.add_resource(AllCitizens, '/citizens')
api.add_resource(CitizensId, '/citizens/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(LogOut, '/logout')
api.add_resource(AllPrefectures, '/prefectures')
api.add_resource(PrefectureId, '/prefectures/<int:id>')
api.add_resource(Businesses, '/businesses')
api.add_resource(BusinessesId, '/businesses/<int:id>')
api.add_resource(AllBusinessReviews, '/businessreviews')
api.add_resource(BusinessReviewId, '/businessreviews/<int:id>')
api.add_resource(AllBusinessTypes, '/businesstypes')
api.add_resource(BusinessTypesId, '/businesstypes/<int:id>')
api.add_resource(AllBusinessTypesConnection, '/businesstypesconnection')
api.add_resource(AllPrefectureCategories, '/prefecturecategories')
api.add_resource(AllPrefectureRatings, '/prefectureratings')
api.add_resource(prefectureCheckIn, '/prefecturecheckin')
api.add_resource(prefectureCheckInId, '/prefecturecheckin/<int:id>')
api.add_resource(PrefectureWishLists, '/prefecturewishlist')
api.add_resource(PrefectureWishListId, '/prefecturewishlist/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)