import React from "react";
import { FaCalendar, FaRegClock, FaUserAlt, FaLocationArrow, FaPlay } from "react-icons/fa";

function formatDate(date: Date) {
    const weekday = [
        "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"
    ]

    return `${weekday[date.getDay()]}, ${date.toLocaleDateString("de-DE")}`

}

type MeetingInfoBoxButtonProps = {
    children: React.ReactNode,
}

const MeetingInfoBoxButton = ({children}: MeetingInfoBoxButtonProps) => {
    return (
        <button className="font-medium rounded-xl px-2.5 py-1 bg-white hover:bg-gray-400" style={{ fontSize: "0.7em" }}>{children}</button>
    )
}

type InfoLineProps = {
    symbol: "Date" | "Time" | "Source" | "Location",
    children: React.ReactNode,
}

const InfoLine = ({
    symbol, children
}: InfoLineProps) => {
    return (
        <span className="flex items-center space-x-1">
            {symbol === "Date" && <FaCalendar className="h-2.5 w-2.5 text-gray-500" />}
            {symbol === "Time" && <FaRegClock className="h-2.5 w-2.5 text-gray-500" />}
            {symbol === "Source" && <FaUserAlt className="h-2.5 w-2.5 text-gray-500" />}
            {symbol === "Location" && <FaLocationArrow className="h-2.5 w-2.5 text-gray-500" />}
            <p className="text-xs">{children}</p>
        </span>
    )
}

type Props = {
    meetingName: string,
    meetingDate: Date,
    meetingLocation?: string,
};

const MeetingInfoBox = ({
    meetingName,
    meetingDate
}: Props) => {
    return (
        <div className="relative p-3 bg-gray-200 rounded-xl" style={{ backgroundColor: "#eee"} }>
            <button className="absolute right-3 top-3 bg-white ml-0.5 p-2 pl-3 rounded-full h-10 w-10 flex items-center justify-center">
                <FaPlay className="h-5 w-5" />
            </button>
            <p className="font-medium truncate" style={{maxWidth: "80%"}}>{meetingName}</p>
            <InfoLine symbol="Date">{formatDate(meetingDate)}</InfoLine>
            <InfoLine symbol="Time">12:00 - 14:00 Uhr</InfoLine>
            <InfoLine symbol="Location">Besprechungszimmer A</InfoLine>
            <InfoLine symbol="Source">eingeladen von Timo Schmidt</InfoLine>
            <div className="mt-3 flex flex-row justify-between">
                <MeetingInfoBoxButton>bearbeiten</MeetingInfoBoxButton>
                <MeetingInfoBoxButton>Agenda hinzufügen</MeetingInfoBoxButton>
                <MeetingInfoBoxButton>12 Teilnehmende</MeetingInfoBoxButton>
            </div>
        </div>
    )
}

export default MeetingInfoBox;