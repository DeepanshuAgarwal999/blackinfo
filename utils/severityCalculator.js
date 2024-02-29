const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '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'
});
const a = {
    type: "Head on collision",
    vehicals: 2,
    casualties: 1,
    property_damage: "Yes"
}
exports.severityCalculator = async (accident) => {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: `You work is to give a severity of a accident in in range 1 to 10,
                  you will take inputs like Type of Accident, Number of Vehicles Involved, Number of Casualties, Property Damage.
                  where 1 means no damage and 10 means total destruction.
                  do not take any other input. and only give the rating of severity of the accident no any other text .`
                },
                {
                    role: "user",
                    content: `Type of Accident:${accident.type}.
                    Number of Vehicles Involved: ${accident.vehicals}.
                    Number of Casualties: ${accident.casualties}.
                    Property Damage: ${accident.property_damage}.`,       
                }],
        model: "gpt-3.5-turbo",
    });
    let GPT3Answer =await completion.choices[0].message.content
    // console.log(GPT3Answe);
    return GPT3Answer;
}
