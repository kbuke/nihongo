from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    user_info = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, nullable=True)
    role = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)


    ALLOWED_ROLES = ("Admin", "Traveller", "Local Business", "Citizen")

    # Validations
    @validates("role")
    def validate_role(self, key, role):
        if role in self.ALLOWED_ROLES:
            return role
        raise ValueError(f"The user's role must be one of {', '.join(self.ALLOWED_ROLES)}")

    @validates("user_info")
    def validate_user_info(self, key, info):
        if 20 <= len(info) <= 250:
            return info 
        raise ValueError("Users Information must be between 20 and 250 characters")

    # Password hashing and authentication
    @hybrid_property
    def password(self):
        raise AttributeError("password: write-only attribute")

    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

class Admin(Users):
    __tablename__ = 'admins'

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Admin',
    }

class Traveler(Users):
    __tablename__ = "travelers"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)

    # Add serialize rules
    serialize_rules = (
        "-user.travelers",
        "-user.admins",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Traveller',
    }

class Citizen(Users):
    __tablename__ = "citizens"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)
    current_town = db.Column(db.String, nullable=True)

    __mapper_args__ = {
        'polymorphic_identity': 'Citizen',
    }
 #-------------------------------------------Traveler User Class---------------------------------------------------------
# class Traveller(Users):
#     __tablename__ = 'travellers'

#     id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     hometown = db.Column(db.String, nullable=True)
#     home_country = db.Column(db.String, nullable=True)

#     #Set up relations
#     prefecture_review = db.relationship("PrefectureReviews", backref="travellers", lazy=True)
#     city_review = db.relationship("CityReviews", backref="travellers", lazy=True)

#     #Set up serialize rules
#     serialize_rules = (
#         "-prefecture_review.travellers", 
#         "-cities_review.travellers",
#     )

#     __mapper_args__ = {
#         'polymorphic_identity': 'Traveller',
#     }

# #-------------------------------------------Admin User Class------------------------------------------------------------
# class Admin(Users):
#     __tablename__ = 'admins'

#     id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     hometown = db.Column(db.String, nullable=True)
#     home_country = db.Column(db.String, nullable=True)

#     __mapper_args__ = {
#         'polymorphic_identity': 'Admin',
#     }


# #-------------------------------------------Prefecture Class-------------------------------------------------------------
# class Prefecture(db.Model, SerializerMixin):
#     __tablename__ = "prefectures"

#     id=db.Column(db.Integer, primary_key=True)
#     name=db.Column(db.String, nullable=False)
#     capital_city=db.Column(db.String, nullable=False, unique=True)
#     population=db.Column(db.Integer)
#     prefecture_info=db.Column(db.String, nullable=True)

#     #Add relations (one to many)
#     cities = db.relationship("City", backref="prefecture", lazy=True)
#     reviews = db.relationship("PrefectureReviews", backref="prefecture", lazy=True)

# #-------------------------------------------City/Town Class--------------------------------------------------------------------
# class City(db.Model, SerializerMixin):
#     __tablename__ = "cities"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     city_info=db.Column(db.String, nullable=True)
#     population=db.Column(db.Integer, nullable=True)

#     #Relations
#     prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"))
#     reviews = db.relationship("CityReviews", backref="city", lazy=True)

# #--------------------------------------------All Review Types Class-----------------------------------------------------------------
# class AllReviewTypes(db.Model, SerializerMixin):
#     __tablename__ = "review_types"

#     id = db.Column(db.Integer, primary_key=True)
#     category = db.Column(db.String, unique=True, nullable=False)

# #--------------------------------------------Prefecture Reviews Class--------------------------------------------------------------------------
# class PrefectureReviews(db.Model, SerializerMixin):
#     __tablename__ = "prefecture_reviews"

#     id = db.Column(db.Integer, primary_key=True)
#     rating = db.Column(db.Integer, nullable=False)
#     comment = db.Column(db.String, nullable=False)

#     #Set up relations
#     prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"))
#     review_type_id = db.Column(db.Integer, db.ForeignKey("review_types.id"))
#     traveler_id = db.Column(db.Integer, db.ForeignKey("travellers.id"))

#     #Set up serialization rules
#     serialize_rules = (
#         "-travellers.prefecture_review",
#         "-travellers.city_review",
#     )

# #--------------------------------------------City Review Class---------------------------------------------------------------------------------
# class CityReviews(db.Model, SerializerMixin):
#     __tablename__="cities_reviews"

#     id = db.Column(db.Integer, primary_key=True)
#     rating = db.Column(db.Integer, nullable=False)
#     comment = db.Column(db.String, nullable=False)

#     #Set up relations
#     city_id = db.Column(db.Integer, db.ForeignKey("cities.id"))
#     review_type_id = db.Column(db.Integer, db.ForeignKey("review_types.id"))
#     traveler_id = db.Column(db.Integer, db.ForeignKey("travellers.id"))

#     #Set up serialization 
#     serialize_rules = (
#         "-travellers.prefecture_review",
#         "-travellers.city_review",
#     )



# #-------------------------------------------Business Type Model----------------------------------------------------------------------------------
# class BusinessType(db.Model, SerializerMixin):
#     __tablename__ = "business_type"

#     id=db.Column(db.Integer, primary_key=True)
#     business=db.Column(db.String, nullable=False)
#     icon=db.Column(db.String, nullable=False, unique=True)
