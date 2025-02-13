import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { useState } from "react";
import { extractUrlAndId } from '../utility/utils';
import { uploadFile } from '../utility/uploadFile.';

export const Profile = () => {
  const { user, deleteAccount, updateCredentials, logOut, msg } = useContext(UserContext);
  const [loading,setLoading] = useState(false)
  const [avatar,setAvatar] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Budget Manager | Profil";
  }, []);

  useEffect(() => {
    if (msg?.deleteUser) {
      logOut();
      toast.success(msg.deleteUser);
      navigate("/");
    } else if (msg?.err) {
      toast.error(msg.err);
    }
  }, [msg, navigate]);

  const handleDelete = () => {
    try {
      deleteAccount();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <NotFound />;



  /*useEffect(()=>{ profilkép feltöltés
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])


  const { register,handleSubmit,formState: { errors },} = useForm({
    defaultValues:{
      displayName:user?.displayName || ''
    }
  });
  const onSubmit = async (data)=>{
    console.log(data.file[0]);
    
    setLoading(true)
    try {
      const file = data?.file ? data?.file[0] : null
      const {url,id} = file ? await uploadFile(file) : null
      
      
      updateCredentials(data.displayName,url+'/'+id)
    } catch (error) {
      console.log(error);

      
    }finally{
      setLoading(false)
    }
    
  }*/

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <Header />
      <h1 className="font-nohemi text-2xl tracking-wide text-sky-200">
        Profile Management
      </h1>
      {/*<div> profilkép feltöltés
        <input 
          type="file" 
          {...register("file", {
            validate: (value) => {
              if (!value[0]) return true;
              const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
              const acceptedFormates = ['jpg', 'png'];
              if (!acceptedFormates.includes(fileExtension)) return 'Invalid file format!';
              if (value[0].size > 1 * 1000 * 1024) return 'Az engedélyezett fájl mérete 1MB';
              return true;
            }
          })}
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <p className='text-danger' style={{ fontSize: '12px', color: 'red' }}>{errors?.file?.message}</p>
      </div>
      {loading && <BounceLoader />}
    {msg && <Toastify {...msg} />}
    {avatar && <img src={avatar} className='img-thumbnail' style={{ marginTop: '15px', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }} />}*/}
      <p className="font-nohemiLight text-xl">Itt lesz a profilkép</p>
      <div className="flex flex-row items-center justify-center gap-2 text-xl">
        <p className="font-nohemiLight">Felhasználóneved: </p>
        <span className="font-nohemiLight text-sky-200">
          {user?.displayName}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="rounded-lg border-2 border-sky-950 bg-red-600/90 px-2 font-nohemi text-xl tracking-wide text-white shadow-md backdrop-blur-sm"
      >
        Delete Account
      </button>
      <Spotlight />
    </div>
  );
};
