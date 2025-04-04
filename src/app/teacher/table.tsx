'use client'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { fetcherClient } from '@/lib/api/axios-client'
import useSWR from 'swr'
import { enumDataType, enumTypeTitle } from '@/services/helpers'
import { fullName } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const Completed = ({ classItem }: any) => {
  const router = useRouter()
  const [activeSkill, setActiveSkill] = useState('3') // reading, listening, writing, speaking
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const query = {
    fields: ['*', 'quiz.*', 'class.*', 'user_created.*', 'review.*'],
    limit: -1,
    filter: {
      class: {
        _eq: classItem.id
      }
    }
  }

  const url = ['/items/answer', query]
  const { data, error, mutate } = useSWR(url, fetcherClient)

  const completedQuizzes = data?.data?.data || []

  // Group quizzes by student and quiz ID
  const quizGroups = completedQuizzes.reduce((acc: any, curr: any) => {
    const quizId = curr?.quiz?.id
    const studentId = curr?.user_created?.id
    const key = `${studentId}-${quizId}`

    if (!acc[key] || new Date(curr.date_created) > new Date(acc[key].date_created)) {
      acc[key] = curr
    }
    return acc
  }, {})

  const submissionCounts = completedQuizzes.reduce((acc: any, curr: any) => {
    const quizId = curr?.quiz?.id
    acc[quizId] = (acc[quizId] || 0) + 1
    return acc
  }, {})

  const processedQuizzes = Object.values(quizGroups).filter(
    (quiz: any) => quiz?.quiz?.data_type == activeSkill
  )

  const quizzesBySkill: any = Object.values(quizGroups).reduce(
    (acc: any, quiz: any) => {
      acc[quiz?.quiz?.data_type] = (acc[quiz?.quiz?.data_type] || 0) + 1
      return acc
    },
    {}
  )

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedQuizzes = processedQuizzes.slice(startIndex, endIndex)
  const totalPages = Math.ceil(processedQuizzes.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className=''>
      <div className='flex flex-wrap gap-2 mb-8 bg-gray-50/100 p-2 rounded-2xl'>
        {enumDataType.map((skill: any) => (
          <button
            key={skill.id}
            onClick={() => {
              setActiveSkill(skill.id)
              setPage(1)
            }}
            className={`flex md:w-fit w-full items-center gap-2 px-6 py-3 rounded-xl capitalize font-medium transition-all duration-300 ${
              activeSkill === skill.id
                ? 'bg-primary1 text-white shadow-lg shadow-primary1/20 scale-105'
                : 'bg-white hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            <span className='text-xl'>{skill.icon}</span>
            <span className='flex gap-2 items-center'>
              {skill.name}
              <span className='bg-gray-100 px-2 py-1 rounded-full text-xs font-normal text-gray-600 w-5 h-5 flex items-center justify-center'>
                {quizzesBySkill[skill.id] || 0}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className='md:hidden space-y-4'>
        <h2 className='md:text-2xl font-bold md:text-center mb-4 md:mb-8 text-gray-800'>
          Danh sách bài đã làm
        </h2>
        {paginatedQuizzes.map((quiz: any) => (
          <div
            key={quiz.id}
            className='bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 hover:border-primary1/30 hover:shadow-lg transition-all duration-300'
          >
            <h3 className='font-semibold text-lg md:mb-4 mb-2 text-gray-800'>
              {quiz.quiz.title}
            </h3>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between items-center p-2 rounded-lg bg-gray-50'>
                <span className='text-gray-600'>Ngày nộp:</span>
                <span className='font-semibold text-gray-900'>
                  {new Date(quiz.date_created).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={
                  page === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              pageNum => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={
                  page === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className='hidden md:block'>
        <Table className='border border-gray-100 rounded-2xl overflow-hidden shadow-md bg-white'>
          <TableHeader className='bg-gray-50/80'>
            <TableRow>
              <TableHead className='font-semibold text-gray-700 py-5 px-6'>
                Học sinh
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-5 px-6'>
                Quiz
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-5 px-6'>
                Ngày nộp
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-5 px-6'>
                Lần nộp
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-5 px-6'>
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedQuizzes.map((quiz: any) => (
              <TableRow
                onClick={() =>
                  router.push(
                    `/result/${enumTypeTitle[quiz?.data_type]}/${quiz?.id}`
                  )
                }
                key={quiz?.id}
                className='hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group'
              >
                <TableCell className='py-5 px-6 font-medium group-hover:text-primary1'>
                  {fullName(quiz?.user_created) || '-'}
                </TableCell>
                <TableCell className='py-5 px-6 group-hover:text-primary1'>
                  {quiz?.quiz?.title || '-'}
                </TableCell>
                <TableCell className='py-5 px-6 group-hover:text-primary1'>
                  {new Date(quiz?.date_created).toLocaleString()}
                </TableCell>
                <TableCell className='py-5 px-6 group-hover:text-primary1'>
                  {submissionCounts[quiz?.quiz?.id]}
                </TableCell>
                <TableCell className='py-5 px-6 group-hover:text-primary1'>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      quiz?.passed
                        ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
                        : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {quiz?.review_status === 'reviewed'
                      ? 'Đã review'
                      : 'Đã nộp'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={
                  page === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              pageNum => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={
                  page === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Completed
