from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

#-----------------------------------models for Users------------------------------------------
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    user_info = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    cover_photo = db.Column(db.String, nullable=False, server_default="")

    # Add relationships
    admins = db.relationship("Admin", backref="user", lazy=True)
    travelers = db.relationship("Traveler", backref="user", lazy=True)
    citizens = db.relationship("Citizen", backref="user", lazy=True)
    businesses = db.relationship("LocalBusinessSites", backref="user", lazy=True)
    prefecture_visit = db.relationship("CheckInPrefecture", backref="user", lazy=True)
    prefecture_wishlist = db.relationship("PrefectureWishList", backref="user", lazy=True)
    business_visit = db.relationship("CheckInBusiness", backref="user", lazy=True)
    business_wishlist = db.relationship("BusinessWishList", backref="user", lazy=True)
    business_reviews = db.relationship("BusinessReviews", backref="user", lazy=True)
    business_pictures = db.relationship("PrefecturePhotos", backref="user", lazy=True)
    profile_picture = db.relationship("UserProfilePicture", backref="user", lazy=True, uselist=False)
    prefecture_reviews = db.relationship("PrefectureCategoryReviews", backref="user", lazy=True)

    type = db.Column(db.String(50))

    __mapper_args__ = {
        'polymorphic_on': type,
        'polymorphic_identity': 'user',
    }

    # Add serialization rules
    serialize_rules = (
        "-_password_hash",
        "-user", 
        "-admins", 
        "-travelers", 
        "-citizens",
        "-businesses",
        "-prefecture",
    )

    ALLOWED_ROLES = ("Admin", "Traveller", "Local Business", "Citizen")

    # Validations
    @validates("role")
    def validate_role(self, key, role):
        if role in self.ALLOWED_ROLES:
            return role
        raise ValueError(f"The user's role must be one of {', '.join(self.ALLOWED_ROLES)}")

    @validates("user_info")
    def validate_user_info(self, key, info):
        if 0 <= len(info) <= 250:
            return info 
        raise ValueError("Users Information must be between 20 and 250 characters")

    # Password hashing and authentication
    @hybrid_property
    #never password always password_hash
    def password_hash(self):
        raise AttributeError("password: write-only attribute")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    # Automatically assign a default profile picture
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.profile_picture:
            self.profile_picture = UserProfilePicture(
                picture_route="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            )


#----------------------------------Model for admins---------------------------------------------
class Admin(Users):
    __tablename__ = 'admins'
    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)
    current_town = db.Column(db.String, nullable=True)
    current_country = db.Column(db.String, nullable=True)

    # Add relationship
   

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-businesses",
        "-business_reviews",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Admin',
    }

#-------------------------------Model for travelers---------------------------------------------
class Traveler(Users):
    __tablename__ = "travelers"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)
    current_town = db.Column(db.String, nullable=True)
    current_country = db.Column(db.String, nullable=True)

    #Add relationship
    

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-businesses",
        "-business_reviews",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Traveller',
    }

#---------------------------Model for citizens-----------------------------------------------
class Citizen(Users):
    __tablename__ = "citizens"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    hometown = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)
    current_town = db.Column(db.String, nullable=True)
    current_country = db.Column(db.String, nullable=True, server_default="Japan")

    #Add relationships
    

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-businesses",
        "-business_reviews",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Citizen',
    }

#--------------------------Model for prefectures---------------------------------------------
class Prefecture(db.Model, SerializerMixin):
    __tablename__ = "prefectures"

    id = db.Column(db.Integer, primary_key=True)
    prefecture_name = db.Column(db.String, nullable=False, unique=True)
    capital_city = db.Column(db.String, nullable=False, unique=True)
    population = db.Column(db.Integer, nullable=False)
    prefecture_info = db.Column(db.String, nullable=False)
    prefecture_flag = db.Column(db.String)
    prefecture_img = db.Column(db.String)

    #Add relationships
    businesses = db.relationship("LocalBusinessSites", backref="prefecture", lazy='joined')
    prefecture_reviews = db.relationship("PrefectureCategoryReviews", backref="prefecture", lazy=True)
    prefecture_visit = db.relationship("CheckInPrefecture", backref="prefecture", lazy=True)
    prefecture_wishlist = db.relationship("PrefectureWishList", backref="prefecture", lazy=True)
    business_pictures = db.relationship("PrefecturePhotos", backref="prefecture", lazy=True)
    

    serialize_rules = (
        "-businesses.prefecture",
    )

#-------------------------Model for local businesses such as restaraunts, arcades, local sites----------------------
class LocalBusinessSites(Users):
    __tablename__ = "businesses"

    @declared_attr
    def id(cls):
        return (db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True))

    name = db.Column(db.String, nullable=False)
    opening_time = db.Column(Time, nullable=False)
    closing_time = db.Column(Time, nullable=False)
    postal_code = db.Column(db.String, nullable=False)
    building_numbers = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    neighbourhood = db.Column(db.String, nullable=False)
    date_registered = db.Column(db.DateTime, server_default=db.func.now())
    card_info = db.Column(db.String, nullable=False, server_default='')
    email = db.Column(db.String, nullable=True)
    contact_number = db.Column(db.String, nullable=True)

    #Add relationship
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"), nullable=False)
    business_reviews = db.relationship("BusinessReviews", backref="business", lazy=True)
    business_types = db.relationship("BusinessTypes", backref="business", lazy=True)
    business_visit = db.relationship("CheckInBusiness", backref="business", lazy=True)
    business_wishlist = db.relationship("BusinessWishList", backref="business", lazy=True)
    business_pictures = db.relationship("PrefecturePhotos", backref="business", lazy=True)

    #Add validations
    @validates("card_info")
    def validate_card_info(self, key, info):
        if 5 <= len(info) <= 100:
            return info 
        raise ValueError("Card Info must be between 5 and 100 characters")
    
    @validates("email")
    def validate_email(self, key, email):
        if email is not None:
            if re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return email
            raise ValueError("Please enter a valid email")
        return email

    @validates("contact_number")
    def validate_number(self, key, phone):
        if len(phone) == 10:
            return phone 
        raise ValueError("Please enter valid phone number")

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-prefecture.businesses",
        # "-business_reviews",
        # "-business_types",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Local Business',
    }

#----------------------------Model for Local Business Reviews------------------------
class BusinessReviews(db.Model, SerializerMixin):
    __tablename__ = "business_reviews"

    id=db.Column(db.Integer, primary_key=True)
    review_rating=db.Column(db.Integer, nullable=False)
    review_comment=db.Column(db.String, nullable=True)
    review_date=db.Column(db.DateTime, server_default=db.func.now())

    #Add relationship
    business_id=db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    #Add serialze rules
    serialize_rules=(
        "-admin",
        "-citizen",
        "-traveler",
        "-business",
    )

#------------------------Model for types of available businesses----------------------------
class RegisteredBusinessTypes(db.Model, SerializerMixin):
    __tablename__ = "regsitered_business_types"

    id = db.Column(db.Integer, primary_key=True)
    business_type = db.Column(db.String, nullable=False, unique=True)

    #Add relationship
    business_types = db.relationship("BusinessTypes", backref="registered_type", lazy=True)

    #Add serialize rules
    serialize_rules=(
        "-business_types",
    )
    

#-------------------------Set up Businesses and their types---------------------------------
class BusinessTypes(db.Model, SerializerMixin):
    __tablename__ = "business_types"

    id = db.Column(db.Integer, primary_key=True)

    #Add relationships
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    business_type_id = db.Column(db.Integer, db.ForeignKey("regsitered_business_types.id"))

    #Add serialize rules
    serialize_rules=(
        "-business",
        "-registered_type",
    )

#------------------------Set up Prefecture Reviews Model-------------------------------------
class PrefectureCategories(db.Model, SerializerMixin):
    __tablename__ = "prefecture_categories"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)

    #Add relations
    prefecture_category_ratings = db.relationship("PrefectureCategoryReviews", backref="review_category", lazy=True)

    #Add serializer rules
    serialize_rules=(
        "-prefecture_category_ratings",
    )

    

class PrefectureCategoryReviews(db.Model, SerializerMixin):
    __tablename__ = "prefecture_reviews"

    id=db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)

    #add relationships
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"))
    prefecture_type_id = db.Column(db.Integer, db.ForeignKey("prefecture_categories.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), nullable=True)
    # citizen_id = db.Column(db.Integer, db.ForeignKey("citizens.id"), nullable=True)
    # traveler_id = db.Column(db.Integer, db.ForeignKey("travelers.id"), nullable=True)

    #Add serialization rules
    serialize_rules=(
        "-admin",
        "-citizen",
        "-traveler",
        "-prefecture",
        "-prefecture",
    )

class CheckInPrefecture(db.Model, SerializerMixin):
    __tablename__ = "prefecture_checkin"

    id=db.Column(db.Integer, primary_key=True)

    #Add relations
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)


    #Add serialize rules
    serialize_rules = (
        "-prefecture",
        "-user",
    )

#----------------------------------Create a business check in model------------------------------
class CheckInBusiness(db.Model, SerializerMixin):
    __tablename__ = "business_checkin"

    id=db.Column(db.Integer, primary_key=True)

    #add relations
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    check_in_date = db.Column(db.DateTime, server_default=db.func.now())

    #add serialize rules
    serialize_rules = (
        "-business",
        "-user",
    )

#-------------------------------Create a prefecture wishlist model-------------------------------
class PrefectureWishList(db.Model, SerializerMixin):
    __tablename__ = "prefecture_wishlist"

    id=db.Column(db.Integer, primary_key=True)

    #Add relations
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    wishlist_date = db.Column(db.DateTime, server_default=db.func.now())

    #Add serialize rules
    serialize_rules = (
        "-user",
        "-prefecture",
    )

class BusinessWishList(db.Model, SerializerMixin):
    __tablename__ = "business_wishlist"

    id = db.Column(db.Integer, primary_key=True)

    #Add relations
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    wishlist_date = db.Column(db.DateTime, server_default=db.func.now())

    #Add serialize rules
    serialize_rules = (
        "-user",
        "-business",
    )

class PrefecturePhotos(db.Model, SerializerMixin):
    __tablename__ = "prefecture_photos"

    id = db.Column(db.Integer, primary_key=True)

    picture_route = db.Column(db.String, nullable=False)
    upload_date=db.Column(db.DateTime, server_default=db.func.now())

    #Add relations
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=True)

class UserProfilePicture(db.Model, SerializerMixin):
    __tablename__ = "userProfilePics"

    id = db.Column(db.Integer, primary_key=True)

    picture_route = db.Column(db.String, nullable=False, server_default="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg")

    #Add relations
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)




    



