import React from "react";
import "./Home.css";
import SearchTile from "../../components/searchTile/SearchTile";
import Button from "../../components/button/Button";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import readinggirl from "../../assets/french girl reading on terrace.jpg"

function Home() {

    // If users click the button I want to send them to the sign up page so I use the useNavigate hook
    const navigate = useNavigate();

    return (
        <>
            {/*Made a component from the header as I will use it again on different pages more or less in the same style*/}
            <Header
                title="Picking books made easy"
                img={readinggirl}
            >
                <h3>Always in doubt which book to read? No time to browse through all the options? Just want to keep it
                    simple with all the choices you already have to make in life? Despair no more: 3OOKS is made for
                    you!</h3>
            </Header>
            <main>
                <section>
                    <h2>Simply click one of the 3 options below and get 3 books to pick from.</h2>
                    {/*Made a component of the tiles as they are all similar in style and I can easily make changes if I want*/}
                    <SearchTile
                        link="/questions"
                        title="Questions"
                        description="Click here to answer 3 questions about your mood, available time and need for reviews."
                    />
                    <SearchTile
                        link="/database"
                        title="Database"
                        description="Click here to search for your favourite author, subject or title."
                    />
                    <SearchTile
                        link="/bestsellers"
                        title="Bestsellers"
                        description="Click here to get the bestselling top 3 books of the moment."
                    />
                </section>
                <section>
                    <h2>About</h2>
                    <p>We don’t care about money; we just care about having less stress. Therefore, 3OOKS is a free
                        application that helps you choose the books you want to read. No more endless scrolling through
                        websites, databases, or lists - just 3 ways to search and get 3 books to choose from. Easy! This
                        leaves more time to actually read the book! Of course, we don't help you tackle the big problems
                        in life here, but making decisions easier can help reduce stress in your day-to-day life,
                        right?</p>
                    <p>You can search in a <Link to="/database">Database</Link> by author, title or subject. More fun
                        is the <Link to="/questions">Questions</Link> option, where you can get books based on your
                        mood, available time and need for reviews. If you prefer it as easy as possible, click on
                        the <Link to="/bestsellers">Bestsellers</Link> and choose one from the top 3 to start reading!
                        You don't have to sign up to use the app, but if you do you can save your favourite books, and
                        we may add some cool features in the future. All for free, so why not start there?</p>
                    <Button
                        type="button"
                        clickHandler={() => navigate("/signup")}
                    >
                        Sign up
                    </Button>
                </section>
            </main>
        </>
    );
}

export default Home;
