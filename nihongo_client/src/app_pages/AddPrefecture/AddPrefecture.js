import { useOutletContext } from "react-router-dom"
import "./AddPrefecture.css"
import { useState } from "react";

import NewPrefectureForm from "./Components/NewPrefectureForm";

function AddPrefecture(){
    const appData = useOutletContext()

    //Set styling
    const addPrefectureStyle = appData.verticalNavHover ? 
    {
        marginLeft: "220px",
        width: "calc(100% - 220px)",
    }
    : 
    {
        marginLeft: "50px",
        width: "calc(100% - 50px)",
    };

    const registeredPrefectures = appData.prefectures
    const setRegisteredPrefectures = appData.setAllPrefectures
    console.log(registeredPrefectures)

    //A list of all Japanese Prefectures
    const prefecturesWithCapitals = [
        { prefecture: "Hokkaido", capital: "Sapporo" },
        { prefecture: "Aomori", capital: "Aomori" },
        { prefecture: "Iwate", capital: "Morioka" },
        { prefecture: "Miyagi", capital: "Sendai" },
        { prefecture: "Akita", capital: "Akita" },
        { prefecture: "Yamagata", capital: "Yamagata" },
        { prefecture: "Fukushima", capital: "Fukushima" },
        { prefecture: "Ibaraki", capital: "Mito" },
        { prefecture: "Tochigi", capital: "Utsunomiya" },
        { prefecture: "Gunma", capital: "Maebashi" },
        { prefecture: "Saitama", capital: "Saitama" },
        { prefecture: "Chiba", capital: "Chiba" },
        { prefecture: "Tokyo", capital: "Tokyo" },
        { prefecture: "Kanagawa", capital: "Yokohama" },
        { prefecture: "Niigata", capital: "Niigata" },
        { prefecture: "Toyama", capital: "Toyama" },
        { prefecture: "Ishikawa", capital: "Kanazawa" },
        { prefecture: "Fukui", capital: "Fukui" },
        { prefecture: "Yamanashi", capital: "Kofu" },
        { prefecture: "Nagano", capital: "Nagano" },
        { prefecture: "Gifu", capital: "Gifu" },
        { prefecture: "Shizuoka", capital: "Shizuoka" },
        { prefecture: "Aichi", capital: "Nagoya" },
        { prefecture: "Mie", capital: "Tsu" },
        { prefecture: "Shiga", capital: "Otsu" },
        { prefecture: "Kyoto", capital: "Kyoto" },
        { prefecture: "Osaka", capital: "Osaka" },
        { prefecture: "Hyogo", capital: "Kobe" },
        { prefecture: "Nara", capital: "Nara" },
        { prefecture: "Wakayama", capital: "Wakayama" },
        { prefecture: "Tottori", capital: "Tottori" },
        { prefecture: "Shimane", capital: "Matsue" },
        { prefecture: "Okayama", capital: "Okayama" },
        { prefecture: "Hiroshima", capital: "Hiroshima" },
        { prefecture: "Yamaguchi", capital: "Yamaguchi" },
        { prefecture: "Tokushima", capital: "Tokushima" },
        { prefecture: "Kagawa", capital: "Takamatsu" },
        { prefecture: "Ehime", capital: "Matsuyama" },
        { prefecture: "Kochi", capital: "Kochi" },
        { prefecture: "Fukuoka", capital: "Fukuoka" },
        { prefecture: "Saga", capital: "Saga" },
        { prefecture: "Nagasaki", capital: "Nagasaki" },
        { prefecture: "Kumamoto", capital: "Kumamoto" },
        { prefecture: "Oita", capital: "Oita" },
        { prefecture: "Miyazaki", capital: "Miyazaki" },
        { prefecture: "Kagoshima", capital: "Kagoshima" },
        { prefecture: "Okinawa", capital: "Naha" }
    ];
    

    return(
        <div 
            id="addPrefectureFormContainer"
            style={addPrefectureStyle}
        >
            <NewPrefectureForm 
                prefecturesWithCapitals={prefecturesWithCapitals}
                registeredPrefectures={registeredPrefectures}
                setRegisteredPrefectures={setRegisteredPrefectures}
            />
        </div>
    )
}
export default AddPrefecture