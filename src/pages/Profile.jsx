/*import { delPhoto, uploadFile } from "../utility/uploadFile";
import { BarLoader } from "react-spinners";
import { Toastify } from "../components/Toastify";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";*/
import { confirm } from "material-ui-confirm";
/*
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";*/
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export const Profile = () => {
  const { user, deleteAccount, logOut,msg,setMsg } = useContext(UserContext);
  if (!user) return <NotFound />;

  const navigate = useNavigate()

  const currencies = [
    {currency : "euro"},
    {currency : "forint"},
    {currency : "dollar"}
  ]


  useEffect(() => {
    setMsg({});
  }, []);

  console.log(msg);
  

  useEffect(() => {
    if (msg?.deleteUser) {
      navigate("/")
      toast.success(msg.deleteUser)
      console.log(msg.deleteUser);
      
    }
  }, [msg,navigate]);

  useEffect(()=>{
    console.log("useeffect");
    
    if(msg?.deleteUser) {
      console.log(msg.deleteUser);
    }
  },[msg?.deleteUser])

  const handleDelete = () => {
    setMsg({ err: null });
    try {
      /*await confirm({
        description: "Ez egy visszavonhatatlan művelet!",
        confirmationText: "Igen",
        cancellationText: "Mégsem",
        title: "Biztosan ki szeretnéd törölni a felhasználói fiókodat?",
      });*/
      deleteAccount();
      logOut();
      
      
      /*delPhoto(user.photoURL.split("/").pop());*/
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1>Profile Management</h1>
      <button onClick={handleDelete}>Delete Account</button>
      <p>Itt lesz  a profilkép</p>
      <p>{user?.displayName}</p>
      <div>
        {currencies.map(e=>(
          <p key={e.currency}>{e.currency}</p>
        ))}
      </div>
    </div>
  );
};
