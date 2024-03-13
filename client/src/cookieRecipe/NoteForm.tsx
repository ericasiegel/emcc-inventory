
import { Cookie } from '../cookies/Cookie'
import useEditData from '../hooks/useEditData'

interface Props {
  cookieId: number;
}

const NoteForm = ({ cookieId }: Props) => {
    const { editData, error, isLoading } = useEditData<Cookie>({
      id: cookieId
    })


  return (
    <div>AddNoteForm</div>
  )
}

export default NoteForm