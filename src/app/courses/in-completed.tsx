'use client'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
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
import { enumDataType, enumTypeTitle } from '@/services/helpers'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const InCompleted = ({ courses }: { courses: any }) => {
  const router = useRouter()
  const [activeSkill, setActiveSkill] = useState('3')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const query = {
    fields: ['*', 'quiz.*', 'class.*'],
    filter: {
      user_created: {
        _eq: '$CURRENT_USER'
      }
    },
    limit: -1
  }

  const url = ['/items/answer', query]
  const { data } = useSWR(url, fetcherClient)

  const completedQuizzes = data?.data?.data || []
  const completedQuizIds = completedQuizzes.map((quiz: any) => quiz.quiz.id)

  // Get all quizzes from courses
  const allQuizzes = courses.reduce((acc: any[], course: any) => {
    if (course.quiz && Array.isArray(course.quiz)) {
      return [
        ...acc,
        ...course.quiz.map((quiz: any) => ({
          ...quiz,
          className: course.title
        }))
      ]
    }
    return acc
  }, [])

  // Filter incomplete quizzes
  const incompleteQuizzes = allQuizzes.filter(
    (quiz: any) =>
      !completedQuizIds.includes(quiz.id) && quiz.data_type == activeSkill
  )

  // Count quizzes by skill type
  const quizzesBySkill = allQuizzes.reduce((acc: any, quiz: any) => {
    if (!completedQuizIds.includes(quiz.id)) {
      acc[quiz.data_type] = (acc[quiz.data_type] || 0) + 1
    }
    return acc
  }, {})

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedQuizzes = incompleteQuizzes.slice(startIndex, endIndex)
  const totalPages = Math.ceil(incompleteQuizzes.length / itemsPerPage)

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

      {/* Desktop view */}
      <div className='hidden md:block'>
        <Table className='border border-gray-100 rounded-2xl overflow-hidden shadow-md bg-white'>
          <TableHeader className='bg-gray-50/80'>
            <TableRow>
              <TableHead className='font-semibold text-primary1 py-5 px-6'>
                Tên bài
              </TableHead>
              <TableHead className='font-semibold text-primary1 py-5 px-6'>
                Tên khóa học
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedQuizzes.map((quiz: any) => {
              const { data_type, id } = quiz
              const link = `/practice/${enumTypeTitle[data_type]}/${id}`
              return (
                <TableRow
                  onClick={() => {
                    router.push(link)
                  }}
                  key={quiz.id}
                  className='hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group'
                >
                  <TableCell className='py-5 px-6 font-medium group-hover:text-primary1'>
                    {quiz.title}
                  </TableCell>
                  <TableCell className='py-5 px-6 font-medium'>
                    {quiz.className}
                  </TableCell>
                </TableRow>
              )
            })}
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

      {/* Mobile view */}
      <div className='md:hidden space-y-4'>
        {paginatedQuizzes.map((quiz: any) => (
          <div
            key={quiz.id}
            className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'
          >
            <h3 className='font-medium text-gray-900 mb-2'>{quiz.title}</h3>
            <p className='text-sm text-gray-600'>{quiz.className}</p>
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
    </div>
  )
}

export default InCompleted
