import {useEffect,useState} from "react";
import { Container,PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate,useParams } from "react-router-dom";

function EditPost() {

    const [post,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug) {
            service.getPost(slug).then((post) =>{
                if(post)
                {
                    setPosts(post)
                }
            })
        } else{
            navigate('/')
        }
    },[slug,navigate])
    
    return post ? (
        <div>
            {console.log(post)}
            <Container>
                <PostForm post = {post}/>
            </Container>
        </div>
    ):null;
}

export default EditPost
