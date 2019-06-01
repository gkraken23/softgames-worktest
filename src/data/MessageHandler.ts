export abstract class MessageHandler
{
    private static messages:string[]=[
        'I play videogames %$videogame.png$% all the time!',
        'I love %$beer.png$%!'
        // 'I live in the Philippines!'
    ]
    public static getMessage(idx:number):string
    {
        return MessageHandler.messages[idx];
    }
}