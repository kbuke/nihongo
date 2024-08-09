# Remote library imports
from flask import request, make_response, session, render_template, url_for, send_from_directory

from flask_restful import Resource

from werkzeug.utils import secure_filename

# Local imports
from config import app, db, api, os
# Add your model imports
from models import Users, Admin, Traveler, Citizen, Prefecture, LocalBusinessSites, BusinessReviews, RegisteredBusinessTypes, BusinessTypes, PrefectureCategories, PrefectureCategoryReviews, CheckInPrefecture, PrefectureWishList, CheckInBusiness, BusinessWishList, PrefecturePhotos, UserProfilePicture
from sqlalchemy import event

user_rules = (
    "-admins",
    "-travelers",
    "-citizens",
    "-businesses",

    "-profile_picture.user",

    #Sort through prefecture visits
    "-prefecture_visit.user",

    "-prefecture_visit.prefecture.businesses",
    "-prefecture_visit.prefecture.prefecture_reviews",
    "-prefecture_visit.prefecture.prefecture_visit",
    "-prefecture_visit.prefecture.prefecture_wishlist",
    "-prefecture_visit.prefecture.business_pictures",

    #Sort through prefecture wishlists
    "-prefecture_wishlist.user",
    "-prefecture_wishlist.prefecture.businesses",
    "-prefecture_wishlist.prefecture.prefecture_reviews",
    "-prefecture_wishlist.prefecture.prefecture_wishlist",
    "-prefecture_wishlist.prefecture.business_pictures",
    "-prefecture_wishlist.prefecture.profile_picture",

    #Sort through business visits
    "-business_visit.user",
    "-business_visit.business.prefecture",
    "-business_visit.business.user",

    "-business_visit.business.business_reviews.user",
    "-business_visit.business.business_reviews.business",

    "-business_visit.business.business_types",
    "-business_visit.business.business_visit",
    "-business_visit.business.business_wishlist",
    "-business_visit.business.business_pictures",
    "-business_visit.business.admin",
    "-business_visit.business.travelers",
    "-business_visit.business.citizens",
    "-business_visit.business.businesses",
    "-business_visit.business.prefecture_visit",
    "-business_visit.business.prefecture_wishlist",
    "-business_visit.business.profile_picture",

    #Sort through business wishlists
    "-business_wishlist.user",
    "-business_wishlist.business.prefecture",
    "-business_wishlist.business.user",

    "-business_wishlist.business.business_reviews.user",
    "-business_wishlist.business.business_reviews.business",

    "-business_wishlist.business.business_types",
    "-business_wishlist.business.business_visit",
    "-business_wishlist.business.business_wishlist",
    "-business_wishlist.business.business_pictures",
    "-business_wishlist.business.admin",
    "-business_wishlist.business.travelers",
    "-business_wishlist.business.citizens",
    "-business_wishlist.business.businesses",
    "-business_wishlist.business.prefecture_visit",
    "-business_wishlist.business.prefecture_wishlist",
    "-business_wishlist.business.profile_picture",

    #Sort through business reviews
    "-business_reviews.user",
    "-business_reviews.business.prefecture",
    "-business_reviews.business.user",

    "-business_reviews.business.business_reviews.user",
    "-business_reviews.business.business_reviews.business",

    "-business_reviews.business.business_types",
    "-business_reviews.business.business_visit",
    "-business_reviews.business.business_wishlist",
    "-business_reviews.business.business_pictures",
     "-business_reviews.business.admin",
    "-business_reviews.business.travelers",
    "-business_reviews.business.citizens",
    "-business_reviews.business.businesses",
    "-business_reviews.business.prefecture_visit",
    "-business_reviews.business.prefecture_wishlist",
    "-business_reviews.business.profile_picture",

    #Sort through business pictures
    "-business_pictures.user",
    "-business_pictures.prefecture",
    "-business_pictures.business.prefecture",
    "-business_pictures.business.user",

    "-business_pictures.business.business_reviews.user",
    "-business_pictures.business.business_reviews.business",

    "-business_pictures.business..business_types",
    "-business_pictures.business.business_visit",
    "-business_pictures.business.business_wishlist",
    "-business_pictures.business.business_pictures",
    "-business_pictures.business.admin",
    "-business_pictures.business.travelers",
    "-business_pictures.business.citizens",
    "-business_pictures.business.businesses",
    "-business_pictures.business.prefecture_visit",
    "-business_pictures.business.prefecture_wishlist",
    "-business_pictures.business.profile_picture",
                
    "-prefecture",
    "-user",
)

profile_pic_rules = (
    "-user.user_info",
    "-user.role",
    "-user._password_hash",
    "-user.admins",
    "-user.travelers",
    "-user.citizens",
    "-user.businesses",
    "-user.prefecture_visit",
    "-user.prefecture_wishlist",
    "-user.business_visit",
    "-user.business_wishlist",
    "-user.business_reviews",
    "-user.business_pictures",
    "-user.profile_picture",
    "-user.user",
    "-user.prefecture",
    "-user.closing_time",
    "-user.neighbourhood",
    "-user.postal_code",
    "-user.card_info",
    "-user.opening_time",
    "-user.type",
    "-user.city",
    "-user.building_numbers",
    "-user.email",
    "-user.date_registered",
    "-user.business_types",
    # "-user.username",
    "-user.contact_number",
    "-user.current_country",
    "-user.hometown",
    "-user.home_country",
    "-user.prefecture_reviews",
    "-user.current_town",
)

#Show all available users, and allow frontend to add new ones
class AllUsers(Resource):
    def get(self):
        users = [user.to_dict(
            rules=(user_rules)) for user in Users.query.all()]
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
            # breakpoint()
            return make_response(user_info.to_dict(
                rules=(user_rules)), 201)
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
                "-businesses",
                "-prefecture_visit",
                "-prefecture_wishlist",
                "-business_visit",
                "-business_wishlist",
                "-business_reviews",
                "-user",
                "-business_pictures",
                "-prefectures",
                "-profile_picture",
            )), 200
        
        return {'error': "Invalid username or password"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        # breakpoint()
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            if user:
                return user.to_dict(
                    rules=(user_rules)), 200
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
            "-businesses.prefecture",
            "-businesses.user",

            "-businesses.business_reviews.business",
            "-businesses.business_reviews.user",
            "-businesses.business_reviews.id",
            "-businesses.business_reviews.review_comment",
            "-businesses.business_reviews.review_date",
            "-businesses.business_reviews.traveler_id",

            "-businesses.business_types.business",
            "businesses.business_types.registered_type",

            "-businesses.business_visit",

            "-businesses.business_wishlist",

            "-businesses.business_pictures",

            "-businesses.admins",

            "-businesses.travelers",

            "-businesses.citizens",

            "-businesses.businesses",

            "-businesses.prefecture_visit",

            "-businesses.prefecture_wishlist",

            "-businesses.profile_picture",

            "-business_pictures.prefecture",
            "-business_pictures.user",
            "-business_pictures.business",
        )) for prefecture in Prefecture.query.all()]
        return prefectures, 200

    def post(self):
        json = request.get_json()
        # breakpoint()
        try:
            new_prefecture = Prefecture(
                prefecture_name = json.get("newPrefecture"),
                capital_city = json.get("newPrefectureCapital"),
                population = json.get("newPrefecturePopulation"),
                prefecture_info = json.get("newPrefectureInfo"),
                prefecture_flag = json.get("newPrefectureFlag"),
                prefecture_img = json.get("newPrefectureImg")
            )
            db.session.add(new_prefecture)
            db.session.commit()
            return new_prefecture.to_dict(
                rules=(
                    "-businesses.prefecture",
                    "-businesses.user",

                    "-businesses.business_reviews.business",
                    "-businesses.business_reviews.user",
                    "-businesses.business_reviews.id",
                    "-businesses.business_reviews.review_comment",
                    "-businesses.business_reviews.review_date",
                    "-businesses.business_reviews.traveler_id",

                    "-businesses.business_types.business",
                    "businesses.business_types.registered_type",

                    "-businesses.business_visit",

                    "-businesses.business_wishlist",

                    "-businesses.business_pictures",

                    "-businesses.admins",

                    "-businesses.travelers",

                    "-businesses.citizens",

                    "-businesses.businesses",

                    "-businesses.prefecture_visit",

                    "-businesses.prefecture_wishlist",

                    "-businesses.profile_picture.user",
                    

                    "-business_pictures.prefecture",
                    "-business_pictures.user",
                    "-business_pictures.business",
                )
            ), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class PrefectureId(Resource):
    def get(self, id):
        prefecture_info = Prefecture.query.filter(Prefecture.id==id).first()
        if prefecture_info:
            # breakpoint()
            return make_response(prefecture_info.to_dict(
                rules=(
                    "-businesses.prefecture",
                    "-businesses.user",

                    "-businesses.business_reviews.business",
                    "-businesses.business_reviews.user",
                    "-businesses.business_reviews.id",
                    "-businesses.business_reviews.review_comment",
                    "-businesses.business_reviews.review_date",
                    "-businesses.business_reviews.traveler_id",

                    "-businesses.business_types.business",
                    "businesses.business_types.registered_type",

                    "-businesses.business_visit",

                    "-businesses.business_wishlist",

                    "-businesses.business_pictures",

                    "-businesses.admins",

                    "-businesses.travelers",

                    "-businesses.citizens",

                    "-businesses.businesses",

                    "-businesses.profile_picture.user",

                    "-businesses.prefecture_visit",

                    "-businesses.prefecture_wishlist",

                    "-business_pictures.prefecture",
                    "-business_pictures.user",
                    "-business_pictures.business",
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
                    "-businesses.profile_picture",
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
                "-user",
                "-admin",
                "-traveler",
                "-citizen",
                "-businesses",
                "-prefecture",

                "-profile_picture.user",


                "-business_reviews.business",
                "-business_reviews.user",

                "-business_reviews.user.admins",
                "-business_reviews.user.travelers",
                "-business_reviews.user.citizens",
                "-business_reviews.user.businesses",
                "-business_reviews.user.prefecture_visit",
                "-business_reviews.user.prefecture_wishlist",
                "-business_reviews.user.business_visit",
                "-business_reviews.user.business_wishlist",
                "-business_reviews.user.business_reviews",
                "-business_reviews.user.user",
                "-business_reviews.user.business_pictures",
                "-business_reviews.user.profile_picture",

                "-business_types.business",
                "business_types.registered_type.business_type",

                "-business_visit.business",

                "-business_visit.user.admins",
                "-business_visit.user.travelers",
                "-business_visit.user.citizens",
                "-business_visit.user.prefecture_visit",
                "-business_visit.user.prefecture_wishlist",
                "-business_visit.user.business_visit",
                "-business_visit.user.business_wishlist",
                "-business_visit.user.business_reviews",
                "-business_visit.user.user",
                "-business_visit.user.current_country",
                "-business_visit.user.user_info",
                "-business_visit.user.prefecture_reviews",
                "-business_visit.user.hometown",
                "-business_visit.user.home_country",
                "-business_visit.user.current_town",
                "-business_visit.user._password_hash",
                "-business_visit.user.role",
                "-business_visit.user.type",
                "-business_visit.user.user_info",
                "-business_visit.user.business_pictures",
                "-business_visit.user.profile_picture",

                "-business_wishlist",
                "-prefecture_id",

                "-business_pictures",

                "-prefecture.business_pictures",
                "-prefecture.businesses",
                "-prefecture.prefecture_reviews",
                "-prefecture.prefecture_visit",
                "-prefecture.prefecture_wishlist",
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
                    "-admin",
                    "-traveler",
                    "-citizen",
                    "-businesses",
                    "-prefecture",

                    "-business_reviews.business",
                    "-business_reviews.user",

                    "-profile_picture.user",

                    "-business_reviews.user.admins",
                    "-business_reviews.user.travelers",
                    "-business_reviews.user.citizens",
                    "-business_reviews.user.businesses",
                    "-business_reviews.user.prefecture_visit",
                    "-business_reviews.user.prefecture_wishlist",
                    "-business_reviews.user.business_visit",
                    "-business_reviews.user.business_wishlist",
                    "-business_reviews.user.business_reviews",
                    "-business_reviews.user.user",
                    "-business_reviews.user.business_pictures",
                    "-business_reviews.user.profile_picture",

                    "-business_types.business",
                    "-business_types.registered_type",

                    "-business_visit.business",

                    "-business_visit.user.admins",
                    "-business_visit.user.travelers",
                    "-business_visit.user.citizens",
                    "-business_visit.user.prefecture_visit",
                    "-business_visit.user.prefecture_wishlist",
                    "-business_visit.user.business_visit",
                    "-business_visit.user.business_wishlist",
                    "-business_visit.user.business_reviews",
                    "-business_visit.user.user",
                    "-business_visit.user.current_country",
                    "-business_visit.user.user_info",
                    "-business_visit.user.prefecture_reviews",
                    "-business_visit.user.hometown",
                    "-business_visit.user.home_country",
                    "-business_visit.user.current_town",
                    "-business_visit.user._password_hash",
                    "-business_visit.user.role",
                    "-business_visit.user.type",
                    "-business_visit.user.user_info",
                    "-business_visit.user.business_pictures",
                    "-business_visit.user.profile_picture",

                    "-business_wishlist",
                    "-prefecture_id",

                    "-business_pictures",

                    "-prefecture.business_pictures",
                    "-prefecture.businesses",
                    "-prefecture.prefecture_reviews",
                    "-prefecture.prefecture_visit",
                    "-prefecture.prefecture_wishlist",
                )
            ), 201)
        return {"error": "Business not found"}

class AllBusinessReviews(Resource):
    def get(self):
        business_reviews = [business_review.to_dict(rules = (
            "-user.admins",
            "-user.travelers",
            "-user.citizens",
            "-user.businesses",
            "-user.prefecture_visit",
            "-user.prefecture_wishlist",
            "-user.business_visit",
            "-user.business_wishlist",
            "-user.business_reviews",
            "-user.business_pictures",
            "-user.profile_picture",
            "-user.user",

            "-business",
        )) for business_review in BusinessReviews.query.all()]
        return business_reviews, 200
    
    def post(self):
        json=request.get_json()
        # breakpoint()
        try:
            new_business_review = BusinessReviews(
                review_rating = json.get("rating"),
                review_comment = json.get("comment"),
                business_id = json.get("business_id"),
                user_id = json.get("user_id")
            )
            db.session.add(new_business_review)
            db.session.commit()
            return new_business_review.to_dict(rules = (
                "-user.admins",
                "-user.travelers",
                "-user.citizens",
                "-user.businesses",
                "-user.prefecture_visit",
                "-user.prefecture_wishlist",
                "-user.business_visit",
                "-user.business_wishlist",
                "-user.business_reviews",
                "-user.business_pictures",
                "-user.profile_picture",
                "-user.user",

                "-business",
            )), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class BusinessReviewId(Resource):
    def get(self, id):
        business_review_info = BusinessReviews.query.filter(BusinessReviews.id==id).first()
        if business_review_info:
            # breakpoint()
            return make_response(business_review_info.to_dict(rules=(
                "-user.admins",
                "-user.travelers",
                "-user.citizens",
                "-user.businesses",
                "-user.prefecture_visit",
                "-user.prefecture_wishlist",
                "-user.business_visit",
                "-user.business_wishlist",
                "-user.business_reviews",
                "-user.business_pictures",
                "-user.profile_picture",
                "-user.user",

                "-business",
            )), 201)
        return {"error": "Business Review Not Found"}
    
    def delete(self, id):
        review_info = BusinessReviews.query.filter(BusinessReviews.id == id).first()
        if review_info:
            db.session.delete(review_info)
            db.session.commit()
            return{
                "message": "Business Review Deleted"
            }, 200
        return {
            "error": "Business Review not found"
        }, 404


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
                # visited = json.get("visited"),
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
            "error": "Prefecture not found"
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
                # wish_list = json.get("inBag"),
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

class BusinessCheckIn(Resource):
    def get(self):
        checkIns = [checkIn.to_dict() for checkIn in CheckInBusiness.query.all()]
        return checkIns, 200

    def post(self):
        json=request.get_json()
        try:
            new_checkin = CheckInBusiness(
                # visited = json.get("visited"),
                business_id = json.get("specificBusinessId"),
                user_id=json.get("loggedUserId")
            )
            db.session.add(new_checkin)
            db.session.commit()
            return new_checkin.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class BusinessCheckInId(Resource):
    def get(self, id):
        check_in_info = CheckInBusiness.query.filter(CheckInBusiness.id==id).first()
        if check_in_info:
            # breakpoint()
            return make_response(check_in_info.to_dict(rules=(
                #Stop recursion error
                "-business.prefecture_id",
                "-business.business_reviews",
                "-business.business_types",
                "-business.business_visit",
                "-business.user",
                "-business.admins",
                "-business.citizens",
                "-business.travelers",
                "-business.businesses",

                "-business.prefecture.businesses",
                "-business.prefecture.prefecture_reviews",
                "-business.prefecture.prefecture_visit",
                "-business.prefecture.prefecture_wishlist",

                "-user.admins",
                "-user.user",
                "-user.citizens",
                "-user.businesses",
                "-user.travelers",
                "-user.prefecture_visit",
                "-user.prefecture_wishlist",
                "-user.business_visit",
                "-user.business_reviews",
                "-user.prefecture_reviews",
                "-user.business_visit",
                "-user.business_types",
                "-user.profile_picture",

                #Make it more readable
                "-business._password_hash",
                "-business.building_numbers",
                "-buisiness.city",
                "-business.closing_time",
                "-business.date_registered",
                "-business.neighbourhood",
                "-business.opening_time",
                "-business.postal_code",
                "-business.prefecture.population",
                "-business.prefecture.prefecture_img",
                "-business.prefecture.capital_city",
                "-business.prefecture_visit",
                "-business.prefecture_wishlist",
                "-business.role",
                "-business.type",
                "-business.username",
                "-business_id",
                "-user._password_hash",
                "-user.current_country",
                "-user.current_town",
                "-user.home_country",
                "-user.hometown",
                "-user.role",
                "-user.type",
            )), 201)
        return {
            "error": "check in not found"
        }
    
    def delete(self, id):
        check_in_info = CheckInBusiness.query.filter(CheckInBusiness.id==id).first()
        if check_in_info:
            db.session.delete(check_in_info)
            db.session.commit()
            return{
                "message": "Business Check in deleted"
            }
        return{
            "error": "Business check in not found"
        }

class BusinessWishLists(Resource):
    def get(self):
        wishlists = [wishlist.to_dict() for wishlist in BusinessWishList.query.all()]
        return wishlists, 200 
    
    def post(self):
        json=request.get_json()
        try:
            new_wishlist = BusinessWishList(
                # wish_list = json.get("wishList"),
                business_id = json.get("specificBusinessId"),
                user_id = json.get("loggedUserId")
            )
            db.session.add(new_wishlist)
            db.session.commit()
            return new_wishlist.to_dict(), 201 
        except ValueError as e:
            return {
                "error": [str(e)]
            }, 400

class BusinessWishListsId(Resource):
    def get(self, id):
        wishlist_info = BusinessWishList.query.filter(BusinessWishList.id==id).first()
        if wishlist_info:
            return make_response(wishlist_info.to_dict(rules=(
                #Stop recursion error
                "-business.prefecture_id",
                "-business.business_reviews",
                "-business.business_types",
                "-business.business_visit",
                "-business.user",
                "-business.admins",
                "-business.citizens",
                "-business.travelers",
                "-business.businesses",

                "-business.prefecture.businesses",
                "-business.prefecture.prefecture_reviews",
                "-business.prefecture.prefecture_visit",
                "-business.prefecture.prefecture_wishlist",

                "-user.admins",
                "-user.user",
                "-user.citizens",
                "-user.businesses",
                "-user.travelers",
                "-user.prefecture_visit",
                "-user.prefecture_wishlist",
                "-user.business_visit",
                "-user.business_reviews",
                "-user.prefecture_reviews",
                "-user.business_visit",
                "-user.business_types",
                "-user.profile_picture",

                #Make it more readable
                "-business._password_hash",
                "-business.building_numbers",
                "-buisiness.city",
                "-business.closing_time",
                "-business.date_registered",
                "-business.neighbourhood",
                "-business.opening_time",
                "-business.postal_code",
                "-business.prefecture.population",
                "-business.prefecture.prefecture_img",
                "-business.prefecture.capital_city",
                "-business.prefecture_visit",
                "-business.prefecture_wishlist",
                "-business.role",
                "-business.type",
                "-business.username",
                "-business_id",
                "-user._password_hash",
                "-user.current_country",
                "-user.current_town",
                "-user.home_country",
                "-user.hometown",
                "-user.role",
                "-user.type",
            )), 201)
        return {
            "error": "wishlist not found"
        }
    
    def delete(self, id):
        wishlist_info = BusinessWishList.query.filter(BusinessWishList.id == id).first()
        if wishlist_info:
            db.session.delete(wishlist_info)
            db.session.commit()
            return{
                "message": "Business wishlist deleted"
            }
        return{
            "error": "Business wishlist not found"
        }

# Define allowed_file function
def allowed_file(filename):
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

class PrefecturePhotographs(Resource):
    def get(self):
        prefecture_pic_info = [prefecture_pic.to_dict(rules=(
            "-user.id",
            "-user.user_info",
            "-user.role",
            "-user._password_hash",
            "-user.admins",
            "-user.travelers",
            "-user.citizens",
            "-user.businesses",
            "-user.prefecture_visit",
            "-user.prefecture_wishlist",
            "-user.prefecture_reviews",
            "-user.business_visit",
            "-user.business_wishlist",
            "-user.business_reviews",
            "-user.business_pictures",
            "-user.user",
            "-user.prefecture",
            "-user.current_country",
            "-user.current_town",
            "-user.type",
            "-user.hometown",
            "-user.home_country",
            "-user.profile_picture",
            "-prefecture",
            "-business",
        )) for prefecture_pic in PrefecturePhotos.query.all()]
        return prefecture_pic_info, 200
    
    def post(self):
        if "image" not in request.files:
            return {"message": "No file part"}, 400

        file = request.files["image"]

        if file.filename == "":
            return {"message": "No selected file"}, 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            # Generate the file URL
            file_url = url_for('uploaded_file', filename=filename, _external=True)

            new_picture = PrefecturePhotos(
                picture_route=file_url,  # Save the URL instead of the path
                user_id=request.form.get("userId"),
                prefecture_id=request.form.get("prefectureId"),
                business_id=request.form.get("businessId")
            )
            db.session.add(new_picture)
            db.session.commit()

            return new_picture.to_dict(
                rules=(
                    "-user.id",
                    "-user.user_info",
                    "-user.role",
                    "-user._password_hash",
                    "-user.admins",
                    "-user.travelers",
                    "-user.citizens",
                    "-user.businesses",
                    "-user.prefecture_visit",
                    "-user.prefecture_wishlist",
                    "-user.prefecture_reviews",
                    "-user.business_visit",
                    "-user.business_wishlist",
                    "-user.business_reviews",
                    "-user.business_pictures",
                    "-user.user",
                    "-user.prefecture",
                    "-user.current_country",
                    "-user.current_town",
                    "-user.type",
                    "-user.hometown",
                    "-user.home_country",
                    "-user.profile_picture",
                    "-prefecture",
                    "-business",
                )
            ), 201
        else:
            return {"message": "File type not allowed"}, 400

class AllProfilePictures(Resource):
    def get(self):
        profile_pic_info = [picture.to_dict(rules=(
            "-user.user_info",
            "-user.role",
            "-user._password_hash",
            "-user.admins",
            "-user.travelers",
            "-user.citizens",
            "-user.businesses",
            "-user.prefecture_visit",
            "-user.prefecture_wishlist",
            "-user.business_visit",
            "-user.business_wishlist",
            "-user.business_reviews",
            "-user.business_pictures",
            "-user.profile_picture",
            "-user.user",
            "-user.prefecture",
            "-user.closing_time",
            "-user.neighbourhood",
            "-user.postal_code",
            "-user.card_info",
            "-user.opening_time",
            "-user.type",
            "-user.city",
            "-user.building_numbers",
            "-user.email",
            "-user.date_registered",
            "-user.business_types",
            # "-user.username",
            "-user.contact_number",
            "-user.current_country",
            "-user.hometown",
            "-user.home_country",
            "-user.prefecture_reviews",
            "-user.current_town",
        )) for picture in UserProfilePicture.query.all()]
        return profile_pic_info, 200

    
class ProfilePicsId(Resource):
    def get(self, id):
        profile_pic_info = UserProfilePicture.query.filter(UserProfilePicture.id == id).first()
        if profile_pic_info:
            return make_response(profile_pic_info.to_dict(rules=(profile_pic_rules)), 201)
        return {
            "error": "profile pictures not found"
        }, 404
    
    def patch(self, id):
        profile_pic_info = UserProfilePicture.query.filter(UserProfilePicture.id == id).first()
        if not profile_pic_info:
            return {"error": "Profile picture not found"}, 404
        
        if "image" not in request.files:
            return {"message": "No file part"}, 400

        file = request.files["image"]
        if file.filename == "":
            return {"message": "No selected file"}, 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            file_url = url_for('uploaded_file', filename=filename, _external=True)
            profile_pic_info.picture_route = file_url

            db.session.commit()
            return profile_pic_info.to_dict(rules=(profile_pic_rules)), 200
        else:
            return {"message": "File type not allowed"}, 400

    
# Add the route to serve the uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


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
api.add_resource(BusinessCheckIn, '/businesscheckin')
api.add_resource(BusinessCheckInId, '/businesscheckin/<int:id>')
api.add_resource(BusinessWishLists, '/businesswishlist')
api.add_resource(BusinessWishListsId, '/businesswishlist/<int:id>')
api.add_resource(PrefecturePhotographs, '/prefecturepics')
api.add_resource(AllProfilePictures, '/profilepics')
api.add_resource(ProfilePicsId, '/profilepics/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)