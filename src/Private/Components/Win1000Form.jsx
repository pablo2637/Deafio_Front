import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import { useMap } from "../../Public/Hooks/useMap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { masterFetch } from "../../Api/fetch";
import { onLoadPoints } from "../../Store/Slices/userSlice";


export const Win1000Form = () => {

    const { places } = useSelector(state => state.places);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { getRestaurants } = useMap();
    const navigate = useNavigate();

    const [filterRest, setFilterRest] = useState([]);

    const handleFilter = ({ target }) => {

        if (target.value == '')
            setFilterRest(places);

        else {

            const newFilter = places.filter(rest => rest.name.toLowerCase().includes(target.value.toLowerCase()))

            setFilterRest(newFilter);
        }
    }


    const onSubmit = async (ev) => {

        ev.preventDefault();

        const recycleData = {
            user_id: user.user_id,
            place_id: ev.target.restaurant.value,
            qty: 0,
            reward: 1000,
        };

        const response = await masterFetch('api/recycle', 'POST', recycleData);

        if (response.ok) {

            dispatch(onLoadPoints(true));

            navigate(-1);
        }


    };



    useEffect(() => {
        // getRestaurants();

    }, []);

    return (

        <section className="shadow-md rounded-lg p-6 ">

            <form
                onSubmit={onSubmit}>

                <div className="flex items-center justify-center mt-3 ">
                    <div className="w-10/12 ">
                        <div className="centerDiv text-3xl font-bold">
                            <p>
                                Gana <span className="orangeColor">1000 puntos</span> respondiéndonos esta simple pregunta.
                            </p>
                        </div>

                        <p
                            className="text-sm font-bold text-slate-900 mt-5 mb-1">
                            ¿Cuál es tu <span className="orangeColor">restaurante favorito</span>?
                        </p>

                        <div>
                            <input
                                onChange={handleFilter}
                                type="text"
                                placeholder="Escribe el restaurante aquí"
                                className="block w-full m-auto placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-black focus:border-amber-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:text-gray-300 dark:focus:border-amber-300" />

                            <select
                                className="block w-full mt-2 mb-8 placeholder-gray-600/70 dark:placeholder-gray-600 rounded-lg border bg-gray-200 px-5 py-2.5 text-black focus:border-amber-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:text-gray-300 dark:focus:border-amber-300"
                                name="restaurant"
                                id="restaurant">
                                Selecciona un comercio
                                {
                                    (filterRest) ?

                                        filterRest.map(rest =>
                                            <option key={`rest${rest.place_id}`} value={rest.place_id}>{`${rest.name}: ${rest.address}`}</option>
                                        )

                                        :
                                        <option defaultValue="">No hay coincidencias...</option>


                                }
                            </select>
                        </div>

                    </div>
                </div>

                <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-md">
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="group rounded-md h-12 w-10/12 bg-amber-500 font-bold text-lg text-white relative overflow-hidden">

                        <p
                            className="flex items-center justify-center text-slate-100 text-center whiteColor">
                            Enviar
                            <img
                                className="mx-2"
                                src="\assets\share_white.png"
                                alt="gana1000" />
                        </p>

                        <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-md">
                        </div>
                    </button>
                </div>

            </form>


        </section>
    )
}
