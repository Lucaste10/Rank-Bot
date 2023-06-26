const { SlashCommandBuilder } = require('discord.js');
const noblox = require("noblox.js")
const { EmbedBuilder } = require('discord.js');
const groupid = 9907897;


async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_39868D0DC7772FF7E6789E1AC3799AF67EF8E9E9D7AFE64D6157D8A26517E8DA9BFA11AA9579DC945E8873035E4AFE81923D13A66F872DFF0CBD406684F8A3EDC7B72AF1E1354DDCBB80604E650E628B11FE08E20F3055211EE73C68651779B64A12E2DCB9E406D225C7953F37C04459F19C6D467DF792D346D8737D703152532B7B2E3C8D8630B60A5460D2EB106547F14519C5798D91D3C9769C2067EA8E9D0A5983D2996581E38B6B9F9EABF3DAE8E5F48D2BD5CB66A648BDB68A8AE12EB96155950E5417AF92D4075645DEAE09753E49A62DC51D00A1AA0E8423B40F191A75F8B4FB1837E23AA44DF587CD08500812196F22F710254992ECB1641025B5AFA265B0DEA0C01A05A8891A8A3C52AB9C3B846C4C5378D4BD96029C1330732545229DDAC17087A64D9997ED3BEDB701781E7A79F32258C712F550451405DA7F061D0C4472A48DC80376D89A85055FD105D7052A65FEB2F9DD7248A376C7E67CFC3D8A24A687AF0422152DA9B87E0F647F84EAAFB7B3CED7CFBF2B8C0EECA1CA50D6F15A4FF7B2D57CDC50FCFF985574356AB56BAEFF5380CC59604C17C42CA2B39F9C34469CAE14DBDE0AF22B2720B49F5BE2C0B87603BEDF11A190D55C9E2D1DF0AB39C1CE104FE2E53BE92DE8FBF119B093362583833578FDBB8509B33CEB181CD56AEB9A316FE0B2BDE8A1E8DC8C8AC77B9B14025475683A7E41BF53638F9EC26D6EEB880EA55CC674BFA465FB2C9C408F07AF0FE3C549D48C426DCF9E995C909EEDE4892F06A5E8FD69B187DEA63DBB8E4B5273066173EF09BB00077C54AFEA13CA9A8579C2449F357F05EE58841D572FD381E348393210E4E17A337607F8FA8802F479563FBAC556EE2F6728A2DACE8BED49B8E23A503FEEA63508FA0FA4F28CBBCFB94A0ABB6A7FD3D849FA7C9B45E282010D09A4CA9D48406B1E463B11186A3F7FA732F3948DCE0223264F4B930BBF2D68') 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    // Do everything else, calling functions and the like.
    const groupInfo = await noblox.getGroup(9907897)
    console.log(groupInfo)
}
startApp()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('demote')
		.setDescription('demote a roblox user.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The full roblox username of the player you would like to demote.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('An optional reason to why you would like to demote the user')
				.setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const username = interaction.options.getString('username')
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const userid =  await noblox.getIdFromUsername(username)
		const userThumbnail = await noblox.getPlayerThumbnail(userid)
		const userThumbnailCon = userThumbnail['0']
		const userThumbnailUrl = userThumbnailCon['imageUrl']
		const rankName = await noblox.getRankNameInGroup(groupid, userid)
		const roles = await noblox.getRoles(groupid)
		const interactionUser = interaction.member.displayName;
		var roleNames = []
		var newRankIndex = roles.forEach((role) => {
			roleNames.push(role.name)
		})
		newRankIndex = roleNames.indexOf(rankName)
		const newRank = roleNames[newRankIndex - 1]

		const demotionEmbed = new EmbedBuilder()
			.setColor(0xeb4d42)
			.setTitle(`Successfully demoted ${username}`)
			.setThumbnail(`${userThumbnailUrl}`)
			.addFields(
				{ name: 'Previous Rank', value: "```" + `${rankName}` + "```", inline: true },
				{ name: 'Target Rank', value: "```" + `${newRank}` + "```", inline: true },
				{ name: 'Initiating User', value: "```" + `${interactionUser}` + "```", inline: false },
				{ name: 'Reason', value: "```" + `${reason}` + "```", inline: false },
			)
			.setTimestamp()
			.setFooter({ text: 'Processed in ISHOP Incorporated', iconURL: 'https://media.discordapp.net/attachments/1063673810705977414/1121937306698391552/department_icon.png' });

		await interaction.channel.send({ embeds: [demotionEmbed] });
		
		noblox.changeRank(groupid, userid, -1)
		return await interaction.deleteReply();
	},
};