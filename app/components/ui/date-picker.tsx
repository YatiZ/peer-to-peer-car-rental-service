import { CalendarIcon } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from './popover'
import React from 'react'
import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'
import { Calendar } from '../atoms/calendar'

type IDate = {
  startDate: Date | undefined
  endDate: Date | undefined
}

interface DatePickerProps {
  isRange?: boolean
  value: IDate
  setValue: (value: IDate) => void
}

const DatePicker = ({ isRange = true, value, setValue }: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<IDate>(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          id="date"
          className=" justify-between"
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {!isRange && date?.startDate ? (
            dayjs(date.startDate).format('YYYY-MM-DD')
          ) : date?.startDate ? (
            date.endDate ? (
              <>
                {dayjs(date.startDate).format('YYYY-MM-DD')} ,{' '}
                {dayjs(date.endDate).format('YYYY-MM-DD')}
              </>
            ) : (
              dayjs(date.startDate).format('YYYY-MM-DD')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
        <Calendar
          mode="range"
          defaultMonth={date?.startDate}
          selected={{
            from: date.startDate,
            to: date.endDate,
          }}
          onSelect={(e) => {
            setDate({
              startDate: e?.from,
              endDate: e?.to,
            })
            setValue({
              startDate: e?.from,
              endDate: e?.to,
            })
          }}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
