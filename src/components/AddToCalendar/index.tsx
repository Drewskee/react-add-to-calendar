import React from "react";
import Tooltip from "./Tooltip";
import { ButtonVariant, ColorKey } from './../shared.types';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Button from "./../Button";
import { cn } from './../../utils/helpers';
import { ICalendarOption } from './Tooltip';

export interface ICalendarEvent {
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    durationInMinutes?: number;
    address?: string;
}

interface AddToCalendarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    calendarEvent: ICalendarEvent;
    buttonText?: string;
    testId?: string;
    wrapperCls?: string;
    buttonCls?: string;
    tooltipListWrapperCls?: string;
    tooltipListItemCls?: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    variant?: ButtonVariant;
    brandColor?: ColorKey;
    showBrandIcons?: boolean;
    calendarOptions?: Array<ICalendarOption | string>
}

export default function AddToCalendarButton(props: AddToCalendarButtonProps) {
    const {
        calendarEvent,
        buttonText = "Add to Calendar",
        testId,
        wrapperCls = "",
        buttonCls = "",
        tooltipListWrapperCls = "",
        tooltipListItemCls = "",
        startIcon,
        variant = ButtonVariant.ghost,
        brandColor = ColorKey.default,
        disabled,
        showBrandIcons = true,
        endIcon,
        calendarOptions
    } = props;
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

    const showOpts = () => {
        setIsTooltipVisible(!isTooltipVisible);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        showOpts();
    }

    const baseBtnCls = "flex items-center gap-2 px-4 py-2";

    return (
        <div className={cn(wrapperCls)} data-testid={testId ? `${testId}-add-to-calendar-wrapper` : "add-to-calendar-wrapper"}>
            <Button disabled={disabled} variant={variant} brandColor={brandColor} classOverrides={cn(baseBtnCls, buttonCls)} onClick={handleClick} dataTestId="infini-ui-data-testid" text={buttonText} startIcon={startIcon || <IoIosAddCircleOutline className="w-4 text-[17px]" />} endIcon={endIcon}></Button>

            {isTooltipVisible && (
                <Tooltip calendarEvent={calendarEvent}
                    tooltipItemsCls={tooltipListItemCls}
                    tooltipListWrapperCls={tooltipListWrapperCls}
                    showBrandIcons={showBrandIcons}
                    options={calendarOptions || [ICalendarOption.Apple, ICalendarOption.Google, ICalendarOption.Yahoo, ICalendarOption.Outlook]} />)}
        </div>
    );
}
