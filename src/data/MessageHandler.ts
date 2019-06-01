export abstract class MessageHandler
{
    public static readonly messages: string[] = [
        'I love games!',
        'I love beer!',
        'I am a dad!',
        'I was born in 1991.',
        'I like Skyrim!',
        'I like Witcher 3!',
    ]

    public static readonly emojis: string[] = [
        '%$family.png$%',
        '%$grin.png$%',
        '%$heart.png$%',
        '%$nervous.png$%',
        '%$ok.png$%',
        '%$philippines.png$%',
        '%$slots.png$%',
        '%$videogame.png$%',
        '%$wink.png$%',
        '%$winktongue.png$%',
        '%$bow.png$%'
    ]

    public static getMessage(idx: number): string
    {
        return MessageHandler.messages[idx];
    }

    public getEmoji(idx: number): string
    {
        return MessageHandler.emojis[idx];
    }
}