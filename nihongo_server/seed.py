from models import Users, Admin, Traveler, Citizen, Prefecture, LocalBusinessSites

from datetime import time

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

        print("Seeding Prefectures")
        hokkaido = Prefecture(
            prefecture_name = "Hokkaido",
            capital_city = "Sapporo",
            population = 1896704,
            prefecture_info = "The northern most part of Japan, and the biggest prefecture in the country.",
            prefecture_flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Hokkaido_Prefecture.svg/1260px-Flag_of_Hokkaido_Prefecture.svg.png",
            prefecture_img = "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2023-05/7-day-itinerary-hokkaido_8.jpg?itok=lgatKqUB"
        )

        kyoto = Prefecture(
            prefecture_name = "Kyoto",
            capital_city = "Kyoto",
            population = 1468065,
            prefecture_info = "The old capital of Japan before Tokyo. The hub of Japanese culture and history.",
            prefecture_flag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZlwPx7_4Q0A9jvT_QRnExfxT3TNPsM6wmw&s",
            prefecture_img = "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM2NjY0Mzg4MzQ3MDI1/kyoto.jpg"
        )

        akita = Prefecture(
            prefecture_name = "Akita",
            capital_city = "Akita",
            population = 327651,
            prefecture_info = "A place unlike any other, seperated from Japanese commerce and politice due to the Ou and Dewa mountains, Akita was isolated untill 600AD",
            prefecture_flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Akita_Prefecture.svg/1200px-Flag_of_Akita_Prefecture.svg.png",
            prefecture_img = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/d8/8f/ea/nyuto-onsen.jpg?w=1400&h=1400&s=1"

        )
        db.session.add_all([hokkaido, kyoto, akita])
        db.session.commit()

        print("Seeding Businesses/Sites")
        kyotoMorris = LocalBusinessSites(
            username = "kyotoMorris",
            user_info = "A nice little hostel in the heart of Kyoto city",
            profile_picture = "https://i.travelapi.com/hotels/36000000/35530000/35524100/35524021/5ef16a39_z.jpg",
            role = "Local Business",
            name = "Kyoto Morris",
            opening_time = time(12, 0),
            closing_time = time(12, 0),
            postal_code = "604-0905",
            building_numbers = "133-1",
            city = "Nakagyo Ward",
            neighbourhood = "Umenokicho",
            prefecture_id = 2
        )
        kyotoMorris.password = "kyotoMorris1"
        db.session.add_all([kyotoMorris])
        db.session.commit()


        print("Finished Seeding")
