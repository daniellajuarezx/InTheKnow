import { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const Home=({uname})=>{
    const navigate=useNavigate();
    const [cat_name, cat_nameSetter] = useState([]);
    const [questions, setQuestions]=useState([]);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const addQRef=useRef();
    const addARef=useRef();
    const cat_nameRef=useRef();

    
    useEffect(()=>{
        if (!uname){navigate('/login');}
    }, [uname, navigate]);
    
    useEffect(()=>{
        const fetchCat=async()=>{
            try{
                const response=await fetch(`http://localhost:5009/categories`);
                const data=await response.json();
                cat_nameSetter(data.categories || []);
            } catch (error){console.error("Error fetching categories", error);}
        };
        fetchCat();
    }, []);
    
    const handleCategoryClick = async (category) => {
        try {
            const response = await fetch(`http://localhost:5009/categories/${category.cat_name}/trivia`);
            const data = await response.json();
            console.log(data);
            setQuestions(data.trivia || []); 
        } catch (error) {console.error("Error fetching questions", error);}
    };
    
    const handleAdd=async()=>{
        const trivia={
            question:addQRef.current.value,
            answer:addARef.current.value,
            cat_nameRef:cat_nameRef.current.value
        }
      
        let parameters={
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(trivia),
        }
    
        try{
            const response=await fetch(`http://localhost:5009/trivia`, parameters);
            const data=await response.json();
            console.log("New Question Added:", data);

            if (data.cat_name === cat_nameRef.current.value) {
                setQuestions((prevQuestions) => [...prevQuestions, data]);
            }
            addQRef.current.value = "";
            addARef.current.value = "";
            cat_nameRef.current.value = "";

            setIsModalOpen(false);
        } catch (error) {console.error("Error adding question:", error);}
    };

return(
    <div>
        <h1 style={{textAlign:"center"}}>In The Know</h1>
        <h3 className="WelcomeMessage">Welcome back, {uname}! </h3>
        <div style={{display:"flex", gap: "25px"}}>
            <ul style={{ listStyle: "none", width:"250px", padding: "10px", height: "45vh", background: "#f2e2fe", color:"#05bbaa"}}>
                <h3 style={{textAlign:"right", paddingRight:"10px" }}>Categories</h3>
                    {cat_name.length > 0 ? ( cat_name.map((category, index) => (
                    <li key={index} style={{ marginBottom: "10px", cursor:"pointer" }}
                        onClick={() => handleCategoryClick(category)}>
                            {category.cat_name}
                    </li>
                ))
                ) : (
                    <li>No categories available</li>
                )}
            </ul>
        <div style={{ position: "relative", width: "100vh", padding: "10px", height: "100vh", background: "#05bbaa", color: "#f2e2fe", paddingLeft: "30px" }}>
          <h3 style={{textAlign:"center" }}>Questions</h3>
          <button onClick={() => setIsModalOpen(true)}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#f2e2fe",
                color: "#05bbaa",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px"
            }}>
                Add Question
            </button>
            <ul style={{listStyle: "none", background: "#05bbaa", color: "#f2e2fe"}}>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <strong>{question.question}</strong>
                        <p style={{paddingLeft:"30px"}}>{question.answer}</p>
                    </li>
                    ))
                ) : (
                    <li>Select a category to view questions</li>
                )}
            </ul>
        </div>
        </div>
        {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            color:"black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}>
            <h3>Add a New Question</h3>
            <input ref={addQRef} type="text" placeholder="Enter question" style={{ marginBottom: "10px", width: "100%" }} />
            <input ref={addARef} type="text" placeholder="Enter answer" style={{ marginBottom: "10px", width: "100%" }} />
            <select ref={cat_nameRef} style={{ marginBottom: "10px", width: "100%" }}>
              {cat_name.map((category, index) => (
                <option key={index} value={category.cat_name}>
                  {category.cat_name}
                </option>
              ))}
            </select>
            <div>
              <button onClick={handleAdd} style={{ marginRight: "10px" }}>
                Submit
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;