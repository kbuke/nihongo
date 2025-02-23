from models import Users, Admin, Traveler, Citizen, Prefecture, LocalBusinessSites, BusinessReviews, RegisteredBusinessTypes, BusinessTypes, PrefectureCategories, PrefectureCategoryReviews, CheckInPrefecture, PrefectureWishList, PrefectureWishList,CheckInBusiness, BusinessWishList, PrefecturePhotos, UserProfilePicture

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
            # profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "London",
            home_country = "UK",
            role="Admin",
            current_town = "Johannesburg",
            current_country = "South Africa",
            cover_photo = "https://media.tacdn.com/media/attractions-content--1x-1/10/29/d5/01.jpg"
        )
        kbuke13.password_hash = "kara1328"

        db.session.add_all([kbuke13])
        db.session.commit()

        print("Seeding Travelers")
        zhirji15 = Traveler(
            username = "zhirji15",
            user_info = "Hoping to plan a trip to Japan for my boyfriend and I. Looking for recommendations.",
            # profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "London",
            home_country = "UK",
            role = "Traveller",
            current_town = "Johannesburg",
            current_country = "South Africa",
        )
        zhirji15.password_hash = "louisBruce"

        gbuke02 = Traveler(
            username = "gbuke02",
            user_info = "Have always wanted to go to Japan, making it a reality now",
            # profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "Armagh",
            home_country = "Ireland",
            role = "Traveller"
        )
        gbuke02.password_hash = "Armagh01"

        db.session.add_all([zhirji15, gbuke02])
        db.session.commit()

        print("Seeding Citizens")
        rNishiyama29 = Citizen(
            username = "rNishiyama29",
            user_info = "Living in Osaka Japan. Hoping to show people more of my beautiful country",
            # profile_picture = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            hometown = "Kyoto",
            home_country = "Japan",
            current_town = "Osaka",
            role="Citizen"
        )
        rNishiyama29.password_hash = "Kyoto1"

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
            prefecture_img = "https://backiee.com/static/wallpapers/1000x563/214176.jpg"
        )

        akita = Prefecture(
            prefecture_name = "Akita",
            capital_city = "Akita",
            population = 327651,
            prefecture_info = "A place unlike any other, seperated from Japanese commerce and politice due to the Ou and Dewa mountains, Akita was isolated untill 600AD",
            prefecture_flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Akita_Prefecture.svg/1200px-Flag_of_Akita_Prefecture.svg.png",
            prefecture_img = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/d8/8f/ea/nyuto-onsen.jpg?w=1400&h=1400&s=1"
        )

        tokyo = Prefecture(
            prefecture_name = "Tokyo",
            capital_city = "Tokyo",
            population = 38000000,
            prefecture_info = "Located at the head of Tokyo Bay, Tokyo is part of the Kantō region on the central coast of Honshu, Japan's largest island. Tokyo serves as Japan's economic center and the seat of both the Japanese government and the Emperor of Japan.",
            prefecture_flag = "https://upload.wikimedia.org/wikipedia/commons/1/15/Flag_of_Tokyo_Metropolis.svg",
            prefecture_img = "https://media.nomadicmatt.com/2024/tokyothings.jpeg"
        )

        db.session.add_all([hokkaido, kyoto, akita, tokyo])
        db.session.commit()

        print("Seeding Businesses/Sites")
        kyotoMorris = LocalBusinessSites(
            username = "kyotoMorris",
            user_info = "A nice little hostel in the heart of Kyoto city",
            # profile_picture = "https://i.travelapi.com/hotels/36000000/35530000/35524100/35524021/5ef16a39_z.jpg",
            role = "Local Business",
            name = "Kyoto Morris",
            opening_time = time(12, 0),
            closing_time = time(12, 0),
            postal_code = "604-0905",
            building_numbers = "133-1",
            city = "Nakagyo Ward",
            neighbourhood = "Umenokicho",
            prefecture_id = 2,
            card_info = "A lovely hotel/hostel in the heart of Kyoto, 5 minutes from the palace",
            email = "kyotomorris@gmail.com",
            contact_number = "0923768978",
            cover_photo="https://photos.smugmug.com/Kyoto/Kyoto-Hotels/i-STdTBzQ/0/81445256/O/kyoto-morris-hostel-booking.com-101303340.jpg",
        )
        kyotoMorris.password_hash = "kyotoMorris1"

        sapparoBeerMuseum = LocalBusinessSites(
            username = "Sapparo Beer Museum",
            user_info = "Come and see how one of Japans most famous beer is created, and learn its rich history",
            # profile_picture = "https://i0.wp.com/obsessedwithjapan.com/wp-content/uploads/2020/02/Sapporo-Beer-Museum-Beer-Hall-Photo-by-Obsessed-with-Japan.png?fit=1938%2C1454&ssl=1",
            role = "Local Business",
            name = "Sapparo Beer Museum",
            opening_time = time(9, 0),
            closing_time = time(17, 0),
            postal_code = "065-8633",
            building_numbers = "9 Chome-1-1 Kita 7",
            city="Higashi Ward",
            neighbourhood = "Johigashi",
            prefecture_id = 1,
            card_info = "The home of Japans oldest, and most famous beers. Come and see how it's produced.",
            cover_photo = "https://www.sapporobeer.jp/brewery/s_museum/img/index-main_img01.jpg"
        )
        sapparoBeerMuseum.password_hash = "iLoveBeer"

        taitoHokkaido = LocalBusinessSites(
            username = "Taito Station Arcade Sapparo",
            user_info = "Biggest arcade in Hokkaido",
            # profile_picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lJpmCa3nVda4iwI9C07LIR0c6TDTlQOdhw&s",
            role = "Local Business",
            name = "Taito Station Arcade Sapparo",
            opening_time = time(10, 0),
            closing_time = time(00, 0),
            postal_code = "060-0063",
            building_numbers = "2 Chome-14 Minami 3",
            city = "Chuo Ward",
            neighbourhood = "Jonishi",
            prefecture_id = 1
        )
        taitoHokkaido.password_hash = "bestArcade"

        goldenTemple = LocalBusinessSites(
            username = "Golden Temple",
            user_info = "The most famous temple in Kyoto, and possibly all of Japan.",
            # profile_picture="https://japaneseplus.org/wp-content/uploads/2021/05/kinkaku-ji-kyoto.jpeg?w=1024",
            role="Local Business",
            name="Golden Temple",
            opening_time = time(7, 0),
            closing_time = time(17, 0),
            postal_code = "603-8361",
            building_numbers = "1",
            city = "Kita Ward",
            neighbourhood = "Kinkakujicho",
            prefecture_id = 2,
            card_info = "One of the most famouse temples in Japan, and the only golden one"
        )
        goldenTemple.password_hash = "loveGold"

        kyotoMonkeyPark = LocalBusinessSites(
            username = "Arashiyama Monkey Park Iwatayama",
            user_info = "Come and see monkeys in Kyoto",
            # profile_picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM3JuFIsBikiMZvKBspT3z57GNG7qN20Usyg&s",
            role="Local Business",
            name="Arashiyama Monkey Park Iwatayama",
            opening_time = time(8, 0),
            closing_time = time(16, 0),
            postal_code = "616-0004",
            building_numbers = "6 1",
            city = "Nishikyo Ward",
            neighbourhood = "Arashiyama Nakaoshitacho",
            prefecture_id = 2
        )
        kyotoMonkeyPark.password_hash = "monkeyingAbout"

        kyotoBambooForest = LocalBusinessSites(
            username = "Arashiyama Bamboo Forest",
            user_info = "The most beautifule bamboo forest in the world. Come and see it for yourself.",
            # profile_picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGS3pzLfCXr0di0Mrgd_R56tYy4DrwNF-Blw&s",
            role = "Local Business",
            name = "Arashiyama Bamboo Forest",
            opening_time = time(8, 0),
            closing_time = time(16, 0),
            postal_code="616-8394",
            building_numbers="",
            city = "Ukyo Ward",
            neighbourhood = "Sagaogurayama Tabuchiyamacho",
            prefecture_id = 2
        )
        kyotoBambooForest.password_hash = "loveBamboo"

        fushimiShrines = LocalBusinessSites(
            username = "Fushimi Inari Taisha",
            user_info = "The most famous route of shrines in the world.",
            # profile_picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIB-kHxGfZOAbqrhhMUJiaZ5A59-T4GqWnyw&s",
            role = "Local Business",
            name = "Fushimi Inari Taisha",
            opening_time = time(00, 0),
            closing_time = time(00, 0),
            postal_code = "612-0882",
            building_numbers = "68",
            city="Fushimi Ward",
            neighbourhood = "Fukakusa Yabunouchicho",
            prefecture_id = 2
        )
        fushimiShrines.password_hash = "shrinesAlot"

        daigoJi = LocalBusinessSites(
            username = "Daigo-ji Temple",
            user_info = "Really pretty Temple, especially in Autumn",
            # profile_picture = "https://i0.wp.com/travellatte.net/wp-content/uploads/2015/10/Daigo-ji-Temple-Garden-01a.png?resize=672%2C372&ssl=1",
            role = "Local Business",
            name = "Daigo-ji Temple",
            opening_time = time(8, 0),
            closing_time = time(16, 0),
            postal_code = "601-1325",
            building_numbers = "22",
            city = "Fushimi Ward",
            neighbourhood = "Daigohigashiojicho",
            prefecture_id = 2
        )
        daigoJi.password_hash = "goJi"

        teamLabs = LocalBusinessSites(
            username = "Team Labs Tokyo",
            user_info = "Cool and unique museum",
            role = "Local Business",
            name = "Team Labs Tokyo",
            opening_time = time(9, 0),
            closing_time = time(17, 0),
            postal_code = "135-0061",
            building_numbers = "6 Chome-1-16 Toyosu",
            city = "Koto City",
            neighbourhood = "Tokyo",
            prefecture_id=4,
            cover_photo="https://team-lab.imagewave.pictures/Hbei6dFGY5h4eX9qGRHhBE?height=2400"
        )
        teamLabs.password_hash = "teamLabs"

        db.session.add_all([
            kyotoMorris, sapparoBeerMuseum, taitoHokkaido, goldenTemple, kyotoMonkeyPark, kyotoBambooForest, 
            fushimiShrines, daigoJi, teamLabs
        ])
        db.session.commit()

        print("Seeding reviews")
        kyotoMorrisAdminReview = BusinessReviews(
            review_rating=5,
            review_comment="Best hotel I stayed in, in Japan.",
            business_id=5,
            user_id=1,
        )

        kyotoMorrisCitizenReview = BusinessReviews(
            review_rating=4,
            review_comment="I worked here, great place",
            business_id=5,
            user_id=4,
        )

        kyotoMorrisTravelerReview = BusinessReviews(
            review_rating=5,
            review_comment="Would stay here every day. Loved it",
            business_id=5,
            user_id=2,
        )

        kyotoMonkeyParkTravelerReview = BusinessReviews(
            review_rating = 5,
            review_comment = "Loved seeing these cute little guys, and an amazing view of Kyoto",
            business_id = 9,
            user_id= 3
        )

        kyotoMonkeyParkAdminReview = BusinessReviews(
            review_rating = 3, 
            review_comment = "The monkeys are cool, and the views nice. But the walk up is very difficult, and the view is bad",
            business_id = 9,
            user_id = 1
        )

        daigoJiTravelerReview = BusinessReviews(
            review_rating = 2,
            review_comment = "The shrine itself is nice, but it's small and expensive",
            business_id = 12,
            user_id = 3
        )

        daigoJiAdminReview = BusinessReviews(
            review_rating = 4,
            review_comment = "Amazing shrine, however there isn't a lot else there and can be very crowded.",
            business_id = 12,
            user_id = 1
        )

        goldenTempleAdminReview = BusinessReviews(
            review_rating = 5,
            review_comment = "Simply amazing",
            business_id = 8,
            user_id = 1
        )
        db.session.add_all([
            kyotoMorrisAdminReview, kyotoMorrisCitizenReview, kyotoMorrisTravelerReview,
            kyotoMonkeyParkTravelerReview, kyotoMonkeyParkAdminReview, daigoJiTravelerReview,
            daigoJiAdminReview, goldenTempleAdminReview
        ])
        db.session.commit()

        print("Seeding business types")
        arcade = RegisteredBusinessTypes(
            business_type = "Arcade"
        )

        hotel = RegisteredBusinessTypes(
            business_type = "Hotel"
        )

        hostel = RegisteredBusinessTypes(
            business_type = "Hostel"
        )

        museum = RegisteredBusinessTypes(
            business_type = "Museum"
        )

        craft_shop = RegisteredBusinessTypes(
            business_type = "Craft Shop"
        )

        restaurant = RegisteredBusinessTypes(
            business_type = "Restaurant"
        )

        park = RegisteredBusinessTypes(
            business_type = "Park"
        )

        cafe = RegisteredBusinessTypes(
            business_type = "Cafe"
        )

        bar = RegisteredBusinessTypes(
            business_type = "Bar"
        )

        exhibition = RegisteredBusinessTypes(
            business_type = "Exhibition"
        )

        shrine = RegisteredBusinessTypes(
            business_type = "Shrine"
        )

        temple = RegisteredBusinessTypes(
            business_type = "Temple"
        )

        tour_guide = RegisteredBusinessTypes(
            business_type = "Tour Guide"
        )

        night_club = RegisteredBusinessTypes(
            business_type = "Night Club"
        )

        castle = RegisteredBusinessTypes(
            business_type = "Castle"
        )

        animal = RegisteredBusinessTypes(
            business_type = "Animal"
        )

        db.session.add_all([
            arcade, hotel, hostel, museum, craft_shop, restaurant, park, cafe, bar, exhibition, shrine, temple, night_club, castle, animal
        ])
        db.session.commit()

        print("Seeding businesses and their types")
        sapparoBeerTypeMuseum = BusinessTypes(
            business_id = 6, 
            business_type_id = 4
        )

        sapparoBeerTypeBar = BusinessTypes(
            business_id = 6,
            business_type_id = 9
        )

        kyotoMorrisTypeHotel = BusinessTypes(
            business_id = 5,
            business_type_id = 2
        )

        kyotoMorrisTypeHostel = BusinessTypes(
            business_id = 5,
            business_type_id = 3
        )

        kyotoMorrisTypeBar = BusinessTypes(
            business_id = 5,
            business_type_id = 9
        )

        taitoHokkaidoTypeArcade = BusinessTypes(
            business_id = 7,
            business_type_id = 1
        )

        goldenTempleTemple = BusinessTypes(
            business_id = 8,
            business_type_id = 12
        )

        goldenTempleShrine = BusinessTypes(
            business_id = 8,
            business_type_id = 11
        )

        fushimiShrinesShrine = BusinessTypes(
            business_id = 11,
            business_type_id = 11
        )

        kyotoMonkeyParkWildlife = BusinessTypes(
            business_id = 9,
            business_type_id = 15
        )

        daigoJiTemple = BusinessTypes(
            business_id = 12,
            business_type_id = 12
        )

        daigoJiShrine = BusinessTypes(
            business_id = 12,
            business_type_id = 11
        )

        db.session.add_all([
            sapparoBeerTypeBar, sapparoBeerTypeMuseum, kyotoMorrisTypeBar, kyotoMorrisTypeHostel, kyotoMorrisTypeHotel, taitoHokkaidoTypeArcade, goldenTempleShrine, 
            goldenTempleTemple, fushimiShrinesShrine, kyotoMonkeyParkWildlife, daigoJiTemple, daigoJiShrine
        ])
        db.session.commit()

        print("Seeding prefecture review categories")
        prefectureHistory = PrefectureCategories(
            category = "History"
        )

        prefectureCulture = PrefectureCategories(
            category = "Culture"
        )

        prefectureCuisine = PrefectureCategories(
            category = "Food"
        )

        prefectureWildlife = PrefectureCategories(
            category = "Wildlife"
        )

        prefectureNightLife = PrefectureCategories(
            category = "Nightlife"
        )

        prefectureBeaches = PrefectureCategories(
            category = "Beaches"
        )

        prefectureNature = PrefectureCategories(
            category = "Nature"
        )

        prefectureShopping = PrefectureCategories(
            category = "Shopping"
        )

        prefectureArt = PrefectureCategories(
            category = "Art"
        )

        db.session.add_all([
            prefectureHistory, prefectureCulture, prefectureCuisine, 
            prefectureWildlife, prefectureNightLife, prefectureBeaches,
            prefectureNature, prefectureShopping, prefectureArt
        ])
        db.session.commit()

        print("Seeding prefecture ratings")
        kyotoAdminHistoryReview = PrefectureCategoryReviews(
            rating = 5,
            prefecture_id = 2,
            prefecture_type_id = 1,
            user_id = 1
        )

        kyotoTravelerHistoryReview = PrefectureCategoryReviews(
            rating=4,
            prefecture_id = 2,
            prefecture_type_id = 1,
            user_id = 2
        )

        kyotoFoodAdminReview = PrefectureCategoryReviews(
            rating = 4,
            prefecture_id = 2,
            prefecture_type_id = 3,
            user_id = 1
        )
        db.session.add_all([kyotoAdminHistoryReview, kyotoTravelerHistoryReview, kyotoFoodAdminReview])
        db.session.commit()

        print("Seeding prefecture check ins")
        kyotoTravelerCheckin = CheckInPrefecture(
            prefecture_id = 2,
            user_id = 2
        )

        kyotoAdminCheckIn = CheckInPrefecture(
            prefecture_id = 2,
            user_id = 1
        )
        db.session.add_all([kyotoTravelerCheckin, kyotoAdminCheckIn])
        db.session.commit()

        print("Seeding Prefecture WishLists")
        kyotoTravelerWishList = PrefectureWishList(
            prefecture_id=2,
            user_id=2
        )
        db.session.add_all([kyotoTravelerWishList])
        db.session.commit()

        print("Seeding business check ins")
        sapparoBeerMuseumAdminCheckIn = CheckInBusiness(
            business_id=6,
            user_id=1
        )

        kyotoMorrisTravelerCheckIn = CheckInBusiness(
            business_id=5,
            user_id=2
        )
        db.session.add_all([sapparoBeerMuseumAdminCheckIn, kyotoMorrisTravelerCheckIn])
        db.session.commit()

        print("Seeding business wishlists")
        kyotoMorrisWishList = BusinessWishList(
            business_id=5,
            user_id=2
        )
        db.session.add_all([kyotoMorrisWishList])
        db.session.commit()

        print("Seeding business Pics")
        business5Pic = PrefecturePhotos(
            picture_route = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBJz3yXslUdTK_M6JhC_-cAnpp8muuh-AAYv4S-fyKA_wSH5a",
            user_id = 1,
            prefecture_id=2,
            business_id=5
        )
        db.session.add_all([business5Pic])
        db.session.commit()

        print("Seeding profile pictures")
        kyotoMorrisPic = UserProfilePicture(
            picture_route = "https://i.travelapi.com/hotels/36000000/35530000/35524100/35524021/5ef16a39_z.jpg",
            user_id = 5
        )

        kbuke13Pic = UserProfilePicture(
            picture_route = "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
            user_id = 1
        )

        sapparoBeerMuseumPic = UserProfilePicture(
            picture_route = "https://www.japan-guide.com/g18/5300_01.jpg",
            user_id=6
        )

        monkeyParkPic = UserProfilePicture(
            picture_route="https://a2.cdn.japantravel.com/photo/20734-230849/1440x960!/kyoto-kyoto-s-wild-monkey-park-230849.jpg",
            user_id=9,
        )

        goldenTemplePic = UserProfilePicture(
            picture_route="https://japaneseplus.org/wp-content/uploads/2021/05/kinkaku-ji-kyoto.jpeg",
            user_id=8,
        )

        fushimiInariPic = UserProfilePicture(
            picture_route="https://www.japan-guide.com/g18/3915_top.jpg",
            user_id=11,
        )

        bambooForestPic = UserProfilePicture(
            picture_route="https://img.veenaworld.com/wp-content/uploads/2023/06/All-You-Need-to-Know-about-the-Arashiyama-Bamboo-Forest-in-Kyoto-Japan.jpg",
            user_id=10
        )

        daigojiPic = UserProfilePicture(
            picture_route="https://www.japan-guide.com/g18/3916_top.jpg",
            user_id=12
        )

        taitoArcade = UserProfilePicture(
            picture_route="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/ef/b9/e6/taito-station.jpg?w=2400&h=-1&s=1",
            user_id=7
        )

        teamLabsPic = UserProfilePicture(
            picture_route = "https://www.justonecookbook.com/wp-content/uploads/2023/03/teamLab-Planets-TOKYO-32-8116.jpg",
            user_id=13
        )
        db.session.add_all([
            kyotoMorrisPic, kbuke13Pic, sapparoBeerMuseumPic, monkeyParkPic, goldenTemplePic, fushimiInariPic,
            bambooForestPic, daigojiPic, taitoArcade, teamLabsPic
        ])
        db.session.commit()



        print("Finished Seeding")
