import { useSelector } from "react-redux";
import { AdminRouters, PlaceRouters, PrivateRouters, PublicRouters } from "./Routers/";
import { NavBar } from "./Public/Components/NavBar";

function App() {

  const { user, status, errorMessage } = useSelector(state => state.user)

  return (

    <>

      <header>
        <NavBar />       
      </header>

      <main>
        <p>user: {user?.role}</p>
        <p>status: {status}</p>
        {
          (status==='authenticated') ?

            (user.role == 'user') ?
              <PrivateRouters />

              :
              (user.role == 'place') ?
                <PlaceRouters />

                :
                <AdminRouters />

            :
            <PublicRouters />
        }

      </main>

      <footer>

      </footer>

    </>

  );
};

export default App
