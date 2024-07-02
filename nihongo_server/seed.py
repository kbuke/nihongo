from models import Users, Admin, Traveler, Citizen

from app import app
from config import db 

from datetime import time

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin Seeding")

        print("Seeding Administrators")
        kbuke13 = Admin(
            username = "kbuke13",
            user_info = "Creating a web applicaation to make travelling around the country of Japan easier.",
            profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "London",
            home_country = "UK",
            role="Admin"
        )
        kbuke13.password = "kara1328"

        db.session.add_all([kbuke13])
        db.session.commit()

        print("Seeding Travelers")
        zhirji15 = Traveler(
            username = "zhirji15",
            user_info = "Hoping to plan a trip to Japan for my boyfriend and I. Looking for recommendations.",
            profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "London",
            home_country = "UK",
            role = "Traveller"
        )
        zhirji15.password = "louisBruce"

        gbuke02 = Traveler(
            username = "gbuke02",
            user_info = "Have always wanted to go to Japan, making it a reality now",
            profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "Armagh",
            home_country = "Ireland",
            role = "Traveller"
        )
        gbuke02.password = "Armagh01"


        db.session.add_all([zhirji15, gbuke02])
        db.session.commit()

        print("Seeding Citizens")
        rNishiyama29 = Citizen(
            username = "rNishiyama29",
            user_info = "Living in Osaka Japan. Hoping to show people more of my beautiful country",
            profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "Kyoto",
            home_country = "Japan",
            current_town = "Osaka",
            role="Citizen"
        )
        rNishiyama29.password = "Kyoto1"

        db.session.add_all([rNishiyama29])
        db.session.commit()


        print("Finished Seeding")
