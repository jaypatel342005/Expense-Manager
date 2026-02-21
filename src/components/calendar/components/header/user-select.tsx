import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { Combobox } from "@/components/ui/combobox-08";

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar();

  const allOption = {
    value: "all",
    label: "All Users & People",
  };

  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
    image: user.picturePath || undefined
  }));

  const options = [allOption, ...userOptions];

  return (
    <div className="flex-1 md:w-64">
      <Combobox
        options={options}
        value={selectedUserId}
        onChange={(val) => {
           setSelectedUserId(val || "all")
        }}
        placeholder="Select person..."
        searchPlaceholder="Search people..."
        emptyText="No person found."
      />
    </div>
  );
}
