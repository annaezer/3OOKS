import React from "react";
import styles from "./About.module.css";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import booktree from "../../assets/book tree medium.jpeg";
import Quote from "../../components/quote/Quote";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

function About() {
    // If users click the button I want to send them to the contact page so I use the useNavigate hook
    const navigate = useNavigate();

    return (
        <>
            {/*Re-using my Header component*/}
            <Header
                title="About us"
                img={booktree}
            />
            <main>
                <div className="outer-container">
                    <div className={styles["background-colour"]}>
                        <section className="inner-container">
                            <h2>Picking books made easy</h2>
                            <p className={styles["about-text"]}>We don’t care about money; we just care about having
                                less stress. Therefore, 3OOKS is a free
                                application that helps you choose the books you want to read. No more endless scrolling
                                through
                                websites, databases, or lists - just 3 ways to search and get 3 books to choose from.
                                Easy! This
                                leaves more time to actually read the book! Of course, we don't help you tackle the big
                                problems
                                in life here, but making decisions easier can help reduce stress in your day-to-day
                                life,
                                right?</p>
                            <p className={styles["about-text-two"]}>You can search in a <Link
                                to="/database">Database</Link> by author, title or subject. More fun
                                is the <Link to="/questions">Questions</Link> option, where you can get books based on
                                your
                                mood, available time and need for reviews. If you prefer it as easy as possible, click
                                on
                                the <Link to="/bestsellers">Bestsellers</Link> and choose one from the top 3 to start
                                reading!
                                You don't have to sign up to use the app, but if you do you can save your favourite
                                books, and
                                we may add some cool features in the future. All for free. If you have any questions
                                about 3OOKS
                                please get in touch, we are happy to hear from you!</p>
                            {/*Re-using my Button component*/}
                            <Button
                                type="button"
                                clickHandler={() => navigate("/contact")}
                            >
                                Contact
                            </Button>
                        </section>
                    </div>
                </div>
                <div className="outer-container">
                    <section className="inner-container">
                        {/*Because I repeat the quote section on a few pages I created a component*/}
                        <Quote
                            text="“Classic – a book which people praise and don’t read.”"
                            author="- Mark Twain"
                        />
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default About;
