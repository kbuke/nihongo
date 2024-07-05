# Remote library imports
from flask import request, make_response, session, render_template, url_for
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users, Admin, Traveler, Citizen, Prefecture, LocalBusinessSites
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
            )) for user in Users.query.all()]
        return users, 200
    
    def post(self):
        json = request.get_json()
        role = json.get("newUserRole")
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
            return new_user.to_dict(), 201
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
        # breakpoint()
        if admin_info:
            return make_response(admin_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",
                    "-businesses",)
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
            return make_response(traveler_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",)
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

        if user and user.authenticate(password):
            session['user_id'] = user.id 
            return user.to_dict(), 200
        
        return {'error': "Invalid username or password"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            if user:
                return user.to_dict(), 200
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
                )
                # only=(
                # "prefecture_name",
                # "capital_city",
                # "population",
                # "prefecture_info",
                # "prefecture_flag",
                # "prefecture_img",
                # "businesses.username",
                # "businesses.name",
                # "businesses.user_info",
                # "businesses.profile_picture",
                # "businesses.role",
                # "businesses.opening_time",
                # "businesses.closing_time",
                # "businesses.postal_code",
                # "businesses.building_numbers",
                # "businesses.city",
                # "businesses.neighbourhood",
                # "businesses.prefecture_id",
                # )
            ), 201)
        return {
            "errors": "prefecture not found"
        }
    
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
            return make_response(business_info.to_dict(
                rules=(
                    "-user",
                    "-admins",
                    "-travelers",
                    "-citizens",
                    "-businesses",
                )
            ), 201)
        return {"error": "Business not found"}


    


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


if __name__ == '__main__':
    app.run(port=5555, debug=True)