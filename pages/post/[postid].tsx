import { NextPage } from 'next';
import { useRouter } from 'next/router';

const PostDetail: NextPage = ():any => {
    const router = useRouter();
    const id = router.query.postid;
    return (<p>{id}</p>);
}
export default PostDetail;