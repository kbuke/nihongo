from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

#-----------------------------------models for Users------------------------------------------
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    user_info = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, nullable=True)
    role = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    #Add relationships
    admins = db.relationship("Admin", backref="user", lazy=True)
    travelers = db.relationship("Traveler", backref="user", lazy=True)
    citizens = db.relationship("Citizen", backref="user", lazy=True)
    businesses = db.relationship("LocalBusinessSites", backref="user")

    type = db.Column(db.String(50))

    __mapper_args__ = {
        'polymorphic_on': type,
        'polymorphic_identity': 'user',
    }

    #Add serialization rules
    serialize_rules = (
        "-_password_hash",
        "-admins.user",
        "-travelers.user",
        "-citizens.user",
        "-businesses.user",
        "-businesses.prefecture",
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
    def password(self):
        raise AttributeError("password: write-only attribute")

    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

#----------------------------------Model for admins---------------------------------------------
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
        "-user.citizens",
        "-user.businesses",
        "-businesses",
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

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-businesses",
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

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-businesses",
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

    serialize_rules = (
        # "-businesses.prefec",
        "-businesses.prefecture",
    #     "-businesses.citizens",
        # "-businesses.admins",
    #     "-businesses.travelers",
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

    #Add relationship
    # prefecture = db.relationship("Prefecture", backref="businesses")
    prefecture_id = db.Column(db.Integer, db.ForeignKey("prefectures.id"), nullable=False)

    # Add serialize rules
    serialize_rules = (
        "-user.admins",
        "-user.travelers",
        "-user.citizens",
        "-user.businesses",
        "-prefecture.businesses",
    )

    __mapper_args__ = {
        'polymorphic_identity': 'Local Business',
    }
    

