# Remote library imports
from flask import request, make_response, session, render_template, url_for
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users, Admin, Traveler, Citizen
from sqlalchemy import event

#Show all available users, and allow frontend to add new ones
class AllUsers(Resource):
    def get(self):
        users = [user.to_dict(rules=("-_password_hash",)) for user in Users.query.all()]
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
            return make_response(user_info.to_dict(rules=("-_password_hash",)), 201)
        return {
            "error": "user not found"
        }

#Show all registered admins
class AllAdministrators(Resource):
    def get(self):
        admins = [admin.to_dict(rules=("-_password_hash",)) for admin in Admin.query.all()]
        return admins, 200

#Show all travelers
class AllTravelers(Resource):
    def get(self):
        travelers = [traveler.to_dict() for traveler in Traveler.query.all()]
        return travelers, 200

#Show all citizens
class AllCitizens(Resource):
    def get(self):
        citizens = [citizen.to_dict() for citizen in Citizen.query.all()]
        return citizens, 200
    


api.add_resource(AllUsers, '/users')
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(AllAdministrators, '/admins')
api.add_resource(AllTravelers, '/travelers')
api.add_resource(AllCitizens, '/citizens')


if __name__ == '__main__':
    app.run(port=5555, debug=True)