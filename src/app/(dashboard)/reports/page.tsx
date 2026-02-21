import { ClientContainer } from "@/components/calendar/components/client-container";
import { CalendarProvider } from "@/components/calendar/contexts/calendar-context";
import { getEvents, getUsers } from "@/components/calendar/requests";
import { Settings } from "lucide-react";
import { ChangeBadgeVariantInput } from "@/components/calendar/components/change-badge-variant-input";
import { ChangeVisibleHoursInput } from "@/components/calendar/components/change-visible-hours-input";
import { ChangeWorkingHoursInput } from "@/components/calendar/components/change-working-hours-input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { TCalendarView } from "@/components/calendar/types";

export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ReportsPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const viewQuery = typeof searchParams.view === 'string' ? searchParams.view : 'month';
    const validViews: TCalendarView[] = ["day", "week", "month", "year", "agenda"];
    const view: TCalendarView = validViews.includes(viewQuery as TCalendarView) ? (viewQuery as TCalendarView) : "month";

    const [events, users] = await Promise.all([getEvents(), getUsers()]);

    return (
        <CalendarProvider users={users} events={events}>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Calendar & Schedule</h2>
                        <p className="text-muted-foreground">Manage your detailed schedule.</p>
                    </div>
                </div>

                <div className="mx-auto flex flex-col gap-4">
                    <ClientContainer view={view} />

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="flex-none gap-2 py-0 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Settings className="size-4" />
                                    <p className="text-base font-semibold">Calendar settings</p>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="mt-4 flex flex-col gap-6">
                                    <ChangeBadgeVariantInput />
                                    <ChangeVisibleHoursInput />
                                    <ChangeWorkingHoursInput />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </CalendarProvider>
    );
}
