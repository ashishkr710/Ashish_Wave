import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Options from './Options';
import axios from 'axios';

const Friends: React.FC = () => {
    const navigate = useNavigate();
    const [searchFriend, setSearchFriend] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [sortIcon, setSortIcon] = useState('/sort.png');

    const handleFriendSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Implement search logic here
    };

    const handleFriendSort = () => {
        // Implement sort logic here
    };
    const getFriends = async () => {
        const response = await axios.get(`http://localhost:3000/allfriends`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response);


        if (response && response.data.status) {
            setFriendList(response.data.data.friends);
        }
    }

    useEffect(() => {
        getFriends();
    }, []);

    console.log("friend list----------->", friendList);


    return (
        <div className="dashboard-wrapper">
            <div id="friend-dashboard">
                <div className="user-wrapper">
                    <div id="friends-header">
                        <img
                            id="left-arrow"
                            src="/left-arrow.png"
                            alt="Go Back"
                            onClick={() => {
                                navigate(`/user`);
                            }}
                        />
                        <h2>Friends</h2>
                    </div>
                    <div id="friends-container-main">
                        <div id="search-friend-container">
                            <div id="search-friend">
                                <img
                                    id="search-icon"
                                    src="/search.png"
                                    alt="Search"
                                />
                                <input
                                    id="input-search"
                                    type="text"
                                    placeholder="Search"
                                    onChange={handleFriendSearch}
                                />
                            </div>
                            <img
                                id="sort-icon"
                                src={sortIcon}
                                alt="Sort"
                                onClick={handleFriendSort}
                            />
                            <button
                                type="submit"
                                id="update-button"
                                onClick={() =>
                                    navigate("/invite-friends")
                                }
                            >
                                Invite Friends
                            </button>
                        </div>
                        <div id="parent-user">
                            {searchFriend.map((item: any, key) => (
                                <div
                                    key={key}
                                    id="invited-user-container"
                                    style={{ cursor: "default" }}
                                >
                                    <img
                                        src={
                                            item.icon ? item.icon : "/user.png"
                                        }
                                        alt="Icon"
                                    />
                                    <div id="invited-user-detail">
                                        <p id="user-name">{item.name}</p>
                                        <p id="user-email">{item.email}</p>
                                    </div>
                                    <div
                                        id="status"
                                        style={{
                                            background: item.isAccepted
                                                ? "#49A15C"
                                                : "#b18d4b",
                                        }}
                                    >
                                        <p>
                                            {item.isAccepted
                                                ? "Accepted"
                                                : "Pending"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {friendList.length === 0 ? (
                                <h1 id="no-friends">Not invited yet!</h1>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Options isUpdated={false} />
        </div>
    );
};

export default Friends;