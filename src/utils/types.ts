export type IconProps = {
    size?: number;
    className?: string;
}

export type LevelType = {
    name: string;
    minPoints: number;
}

export type DailyEventType = {
    title: string;
    imageSrc: string;
    timeLeft: string;
}

export type ClickAnimationType = {
    id: number;
    x: number;
    y: number;
}

export type BottomMenuItemType = {
    icon: React.ReactNode | string;
    title: string;
    isActive?: boolean;
    bgColor?: string;
}