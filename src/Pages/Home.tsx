import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import GeneralTable from '@/Components/Tables/GeneralTable';


export default function Home() {
  
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
    return (
      <div className='py-12'>
        <GeneralTable />
        <div className='py-4'></div>
      </div>
    )
  }
