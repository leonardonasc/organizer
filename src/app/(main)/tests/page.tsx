import Loading from '@/components/loading'
import Separator from '@/components/separator'
import { Card } from '@/components/ui/card'
import { FlaskIcon } from '@/components/ui/flask'
import SidebarTitle from '@/components/ui/sidebar-title'

export default function page() {
  return (
    <div className="flex flex-col p-6 items-start justify-start w-full h-full bg-neutral-900 rounded-lg">

      <div className="flex w-full justify-between text-xs text-neutral-500 font-semibold mb-5">
        <span className="flex items-center gap-x-2"><FlaskIcon size={15} />Test Area</span>
        <span>Last updated: 3 hours ago</span>
      </div>


      <div className='flex gap-x-3 items-center'>
        {/* test1 */}
        <div className='flex flex-col gap-y-1'>
          <SidebarTitle category={'Loading'} />
          <Card className='size-30 items-center justify-center bg-neutral-800'>
            <Loading />
          </Card>
        </div>

        <Separator orientation='vertical' color='bg-neutral-800' />

        {/* test2 */}
        <div className='flex flex-col gap-y-1'>
          <SidebarTitle category={'Loading'} />
          <Card className='size-30 items-center justify-center bg-neutral-800'>
            <Loading />
          </Card>
        </div>
      </div>


    </div>
  )
}
