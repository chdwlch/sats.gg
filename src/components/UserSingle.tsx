import { inferProcedureOutput } from '@trpc/server'
import { AppRouter } from '~/server/routers/_app'
import { PublicKeyDisplay } from '~/components/PublicKeyDisplay'
import Link from 'next/link'
import { format } from 'date-fns'
import { standardDateDayFormat, standardDateNumberDayFormat } from '~/utils/date'

type UserSingleOutput = inferProcedureOutput<AppRouter['user']['listLatest']>[0]

const DateValue = ({ value, property }: { value: Date | null; property: string }) => {
  return (
    <div className={'flex flex-row'}>
      <div className={'w-24'}>{`${property}`}</div>
      {value ? (
        <div className={'flex flex-row gap-1'}>
          <p className={'w-20'}>{format(value, standardDateDayFormat)},</p>
          <p>{format(value, standardDateNumberDayFormat)}</p>
        </div>
      ) : (
        'N/A'
      )}
    </div>
  )
}

interface UserSingleProps {
  user: UserSingleOutput
}

export const UserSingle = ({ user }: UserSingleProps) => {
  return (
    <Link href={`/${user.userName}`}>
      <div
        className={
          'my-2 flex flex-row rounded-tl-lg border-2 border-gray-400 p-3 text-sm transition duration-150 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:drop-shadow-lg'
        }
      >
        <img
          className="mr-2 h-14 w-14"
          src={user.profileImage ?? 'https://picsum.photos/250'}
          alt={`profile image of ${user.userName}`}
        />
        <div className={'flex w-full flex-row gap-4'}>
          <div className={'flex w-1/5 flex-col'}>
            <div>@{user.userName}</div>
          </div>
          <div className={'flex w-2/5 flex-col'}>
            <DateValue property={'created at:'} value={user.createdAt} />
            <DateValue property={'updated at:'} value={user.updatedAt} />
          </div>
          <div className={'flex w-2/5 flex-col'}>
            <b>bio:</b>
            <p id={'user-bio-display'}>{user.bio}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
