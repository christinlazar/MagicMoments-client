import React, { useState ,useEffect} from 'react'
import { profileSubmission } from '../../api/userApi'

function Profile() {
  const [content,setContent] = useState<string>('')
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
   e.preventDefault()
    try {
      const res = await profileSubmission(content)
    } catch (error) {
      
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input type='text' placeholder='type somothing' value={content} onChange={(e)=>{setContent(e.target.value)}}/>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Profile