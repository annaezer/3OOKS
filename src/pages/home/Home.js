import React from "react";
import "./Home.css";
import SearchButton from "../../components/searchButton/SearchButton";

function Home() {
    return (
        <>
            <h1>3OOKS</h1>
            <h2>Picking books made easy</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus enim quis ut. Asperiores at
                cupiditate error facilis laudantium magni molestiae mollitia reiciendis sequi voluptatem. Accusantium
                animi at beatae blanditiis commodi consequatur cupiditate, dolor enim est et exercitationem explicabo
                facere iure iusto labore laudantium libero necessitatibus, non numquam provident quibusdam repellat sed
                similique sit tempora totam veniam. Aliquam laborum quidem quos!</p>

            <main>
                <section>
                    <SearchButton
                        title="Questions"
                        description="Click here to search for blabla"
                        />
                    <SearchButton
                        title="Database"
                        description="Click here to search for blabla"
                    />
                    <SearchButton
                        title="Bestsellers"
                        description="Click here to search for blabla"
                    />
                </section>
                <section>
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto dicta ducimus est expedita iure magni minima nihil officiis perspiciatis, placeat possimus praesentium reiciendis repellat veniam. Eveniet ex, laborum natus praesentium similique totam. Accusamus aspernatur blanditiis, dolor dolores esse id odio, pariatur provident qui quibusdam quis quos reiciendis saepe, sit temporibus velit voluptatibus. Ad amet culpa dolorem eaque ipsum nam praesentium tempore? Aliquam, aliquid assumenda at aut commodi dolor eius et ex fuga harum id ipsa ipsam maiores minus mollitia nam nulla obcaecati quam quisquam reiciendis repellendus rerum sequi sunt tempora tempore ullam vel. Amet culpa, cum explicabo fuga illum officia optio, possimus praesentium quis reprehenderit sequi voluptate? Corporis cumque digni.</p>
                </section>
            </main>
        </>
    );
}

export default Home;
