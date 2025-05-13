import { useEffect } from "react";
import { instance } from "../instance";

export const Home = () => {

    useEffect(() => {
        instance.get('users/1')
        .then(res => console.log({res}))
    })

    return (
        <div>
            Hello, Person!
        </div>
    );
};