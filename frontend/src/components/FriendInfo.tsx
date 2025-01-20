import "./All.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FriendInfoProps {
    closeModel: () => void;
    friendId: string;
}

const FriendInfo: React.FC<FriendInfoProps> = ({ closeModel, friendId }) => {
    const [friendInfo, setFriendInfo] = useState<any>({});

    const fetchFriendDetail = async () => {
        try {
            let response = await axios.get(
                `http://127.0.0.5:3000/user/${friendId}/friend-details`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response && response.data && response.data.status) {
                setFriendInfo(response.data.data);
            }
        } catch (err: any) {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchFriendDetail();
    }, []);

        return (
            <>
                <div id="model-wrapper" onClick={closeModel}></div>
                <div id="wave-model">
                    <div id="friend-cover-color">
                        <h1>Details</h1>
                        <div id="user-profile">
                            <img
                                id="friend-user-icon"
                                src={
                                    friendInfo.profileIcon
                                        ? friendInfo.profileIcon
                                        : "/user.png"
                                }
                                alt="user"
                            />
                            <div id="creator-details">
                                <p id="friend-name">{friendInfo.name}</p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                            ></svg>
                        </div>
                    </div>
                </div>
            </>
        )
    };