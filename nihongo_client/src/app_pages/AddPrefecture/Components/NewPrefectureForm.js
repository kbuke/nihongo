import { useEffect, useState } from "react";

import "./NewPrefectureForm.css";

function NewPrefectureForm({
    prefecturesWithCapitals,
    registeredPrefectures,
    setRegisteredPrefectures
}) {
    const [filterPrefectures, setFilterPrefecture] = useState([]);
    const [newPrefecture, setNewPrefecture] = useState("");
    const [newPrefectureCapital, setNewPrefectureCapital] = useState("");
    const [newPrefecturePopulation, setNewPrefecturePopulation] = useState()
    const [newPrefectureInfo, setNewPrefectureInfo] = useState("")
    const [newPrefectureFlag, setNewPrefectureFlag] = useState("")
    const [newPrefectureImg, setNewPrefectureImg] = useState("")
    const [addedNewPrefecture, setAddedNewPrefecture] = useState(false)

    console.log(registeredPrefectures)

    // Extract the names of the registered prefectures
    const registeredPrefectureNames = registeredPrefectures.map(prefecture => prefecture.prefecture_name);

    useEffect(() => {
        // Filter out the prefectures that are already registered
        setFilterPrefecture(prefecturesWithCapitals.filter(prefecture => !registeredPrefectureNames.includes(prefecture.prefecture)));
    }, [registeredPrefectures, prefecturesWithCapitals]);

    // Sort prefectures alphabetically
    const sortPrefecture = filterPrefectures.sort((a, b) => a.prefecture.localeCompare(b.prefecture));
    console.log(sortPrefecture);

    // Display prefecture options
    const prefectureOptions = sortPrefecture.map((prefecture, index) => (
        <option key={index} value={prefecture.prefecture}>
            {prefecture.prefecture}
        </option>
    ));

    // Filter prefectures to find capital
    const handleNewPrefectureInfo = (e) => {
        const selectedPrefecture = e.target.value;
        setNewPrefecture(selectedPrefecture);
        const selectedPrefectureData = sortPrefecture.find(prefecture => prefecture.prefecture === selectedPrefecture);
        setNewPrefectureCapital(selectedPrefectureData?.capital || "");
    };

    console.log(`You have chosen to add ${newPrefecture}, whose capital is ${newPrefectureCapital} with a population of ${newPrefecturePopulation}`);

    const handlePost = (e) => {
        e.preventDefault()
        const jsonData = {
            newPrefecture,
            newPrefectureCapital,
            newPrefecturePopulation,
            newPrefectureInfo,
            newPrefectureFlag,
            newPrefectureImg
        }
        fetch("/prefectures", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newPrefecture => {
                setRegisteredPrefectures([...registeredPrefectures, newPrefecture])
            })
            .then(setAddedNewPrefecture(true))
    }

    return (
        <form 
            id="newPrefectureForm"
            onSubmit={handlePost}
        >
            {addedNewPrefecture ? 
                <h4>New Prefecture Added</h4>
                :
                null
            }
            <div className="newPrefectureInput">
                <h4>Select New Prefecture</h4>
                <select 
                    onChange={handleNewPrefectureInfo}
                >
                    <option 
                        value="" disabled selected
                    >
                        Select New Prefecture
                    </option>
                    {prefectureOptions}
                </select>
            </div>

            <div className="newPrefectureInput">
                <h4>{newPrefecture}'s Capital</h4>
                <h4>{newPrefectureCapital}</h4>
            </div>

            <div className="newPrefectureInput">
                <h4>{newPrefecture}'s Population</h4>
                <input 
                    type="number"
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                            setNewPrefecturePopulation(value);
                        } else {
                            setNewPrefecturePopulation(null);
                        }
                    }}
                />
            </div>

            <div className="newPrefectureInput">
                <h4>{newPrefecture} Info</h4>
                <input 
                    type="text"
                    onChange={(e) => setNewPrefectureInfo(e.target.value)}
                />
            </div>

            <div className="newPrefectureInput">
                <h4>{newPrefecture}'s Flag</h4>
                <input 
                    type="text"
                    onChange={(e) => setNewPrefectureFlag(e.target.value)}
                />
            </div>

            <div className="newPrefectureInput">
                <h4>{newPrefecture}'s Image</h4>
                <input 
                    type="text"
                    onChange={(e) => setNewPrefectureImg(e.target.value)}
                />
            </div>

            <button type="submit">
                Register {newPrefecture}
            </button>
        </form>
    );
}

export default NewPrefectureForm;

