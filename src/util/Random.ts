export abstract class Random
{
    public static randomRange(min: number, max: number, floor: boolean=true)
    {
        if (floor)
            return Math.floor(Math.random() * max) + min;
        else
           return Math.random() * max + min;
    }
}