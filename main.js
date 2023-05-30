(()=>{"use strict";var e=[,e=>{e.exports=require("tslib")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});a(1).__exportStar(a(3),t)},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.apolloBootstrapper=void 0;const r=a(4),i=a(5),n=a(6);t.apolloBootstrapper=(e,t,a,o,s={},c=fetch,_=WebSocket,l={})=>{const u="user"===a?{Authorization:`Bearer ${o()}`}:{"x-hasura-admin-secret":`${o()}`},d=(0,r.createHttpLink)({uri:`${t?"https":"http"}://${e}`,headers:{...u},fetch:c}),p=new i.WebSocketLink({uri:`${t?"wss":"ws"}://${e}`,options:{lazy:!0,reconnect:!0,connectionParams:async()=>({headers:{...u}})},webSocketImpl:_}),m=(0,r.split)((({query:e})=>{const{kind:t,operation:a}=(0,n.getMainDefinition)(e);return"OperationDefinition"===t&&"subscription"===a}),p,d);return new r.ApolloClient({cache:new r.InMemoryCache(s),link:m,defaultOptions:l,connectToDevTools:!0})}},e=>{e.exports=require("@apollo/client")},e=>{e.exports=require("@apollo/client/link/ws")},e=>{e.exports=require("@apollo/client/utilities")},e=>{e.exports=require("apollo-server-express")},e=>{e.exports=require("cross-fetch")},e=>{e.exports=require("express")},e=>{e.exports=require("express-jwt")},e=>{e.exports=require("jwks-rsa")},e=>{e.exports=require("type-graphql")},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.authChecker=void 0;t.authChecker=async({context:e},t)=>{if(0===t.length)return!0;if(!(null==e?void 0:e.roles))throw console.warn("No roles present in JWT."),new Error("ACCESS DENIED: You have no roles.");const a=e.roles;for(const r of t)if(!a.includes(r))throw new Error(`ACCESS DENIED: You need to have role: ${r} for this action.`);return!0}},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Auth0API=void 0;const r=a(1),i=a(15),n=r.__importDefault(a(16));class Auth0API extends i.DataSource{constructor(){super(...arguments),this.trySetUserRole=async(e,t)=>this.post(`/users/${e}/roles`,{roles:[t]})}async getManagementToken(){const e={method:"POST",url:`https://${process.env.AUTH0_DOMAIN}/oauth/token/`,headers:{"content-type":"application/json"},data:{grant_type:"client_credentials",client_id:process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,client_secret:process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,audience:`https://${process.env.AUTH0_DOMAIN}/api/v2/`}};return n.default.request(e)}async post(e,t){const{data:{access_token:a}}=await this.getManagementToken(),r={method:"POST",url:`https://${process.env.AUTH0_DOMAIN}/api/v2`+e,headers:{"content-type":"application/json",authorization:`Bearer ${a}`,"cache-control":"no-cache"},data:t};return n.default.request(r)}}t.Auth0API=Auth0API},e=>{e.exports=require("apollo-datasource")},e=>{e.exports=require("axios")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HasuraAPI=void 0;const r=a(18),i=a(15);class HasuraAPI extends i.DataSource{constructor(e){super(),this.trySetDisplayName=async(e,t)=>this.client.mutate({mutation:r.SetDisplayNameByUserIdDocument,variables:{id:e,display_name:t}}),this.getGalacticEmpiresByGalaxyId=async e=>this.client.query({query:r.GalacticEmpiresByGalaxyIdDocument,variables:{galaxyId:e}}),this.getGalaxyByIdWithUnclaimedCelestials=async e=>this.client.query({query:r.GetGalaxyByIdAndUnclaimedCelestialsDocument,variables:{galaxyId:e}}),this.tryInsertClaimedCelestial=async({userId:e,celestialId:t,galaxyId:a,galacticEmpireId:i,celestialName:n})=>this.client.mutate({mutation:r.TryInsertClaimedCelestialDocument,variables:{id:t,owner_id:e,name:n,galaxy_id:a,galactic_empire_id:i}}),this.tryInsertPlanetToCelestial=async e=>this.client.mutate({mutation:r.TryInsertPlanetDocument,variables:e}),this.client=e}}t.HasuraAPI=HasuraAPI},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});a(1).__exportStar(a(19),t)},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Quest_Reward_Type_Constraint=t.Quest_Reward_Select_Column=t.Quest_Reward_Constraint=t.Quest_Constraint=t.Playable_Race_Update_Column=t.Playable_Race_Select_Column=t.Playable_Race_Constraint=t.Planetary_Ring_Update_Column=t.Planetary_Ring_Select_Column=t.Planetary_Ring_Constraint=t.Planet_Update_Column=t.Planet_Select_Column=t.Planet_Constraint=t.Order_By=t.Npc_Update_Column=t.Npc_Select_Column=t.Npc_Constraint=t.Galaxy_Update_Column=t.Galaxy_Select_Column=t.Galaxy_Constraint=t.Galactic_Empire_Update_Column=t.Galactic_Empire_Select_Column=t.Galactic_Empire_Resources_Update_Column=t.Galactic_Empire_Resources_Select_Column=t.Galactic_Empire_Resources_Constraint=t.Galactic_Empire_Resource_Generator_Update_Column=t.Galactic_Empire_Resource_Generator_Select_Column=t.Galactic_Empire_Resource_Generator_Constraint=t.Galactic_Empire_Quest_Update_Column=t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns=t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And_Arguments_Columns=t.Galactic_Empire_Quest_Select_Column=t.Galactic_Empire_Quest_Constraint=t.Galactic_Empire_Npc_Update_Column=t.Galactic_Empire_Npc_Select_Column=t.Galactic_Empire_Npc_Constraint=t.Galactic_Empire_Constraint=t.Faction_Update_Column=t.Faction_Select_Column=t.Faction_Constraint=t.Cursor_Ordering=t.Chat_Message_Update_Column=t.Chat_Message_Select_Column=t.Chat_Message_Constraint=t.Celestial_Update_Column=t.Celestial_Select_Column=t.Celestial_Constraint=t.Background_Update_Column=t.Background_Select_Column=t.Background_Constraint=void 0,t.LatestMessageDocument=t.GetChatMessagesDocument=t.CharacterDataDocument=t.TryInsertClaimedCelestialDocument=t.CreateEmpireOriginCelestialDocument=t.CelestialsByGalaxyIdDocument=t.CelestialsDocument=t.CelestialByIdDocument=t.TechFieldsFragmentDoc=t.QuestFieldsFragmentDoc=t.GalacticEmpireQuestFieldsFragmentDoc=t.GalaxyFieldsFragmentDoc=t.CelestialFieldsFragmentDoc=t.GalacticEmpireFieldsFragmentDoc=t.User_Private_Select_Column=t.User_Me_Select_Column=t.User_Info_Update_Column=t.User_Info_Select_Column=t.User_Info_Constraint=t.Terrain_Hex_Palette_Update_Column=t.Terrain_Hex_Palette_Select_Column=t.Terrain_Hex_Palette_Constraint=t.Technology_Update_Column=t.Technology_Select_Column=t.Technology_Constraint=t.Resource_Type_Update_Column=t.Resource_Type_Select_Column=t.Resource_Type_Constraint=t.Resource_Generator_Type_Update_Column=t.Resource_Generator_Type_Select_Column=t.Resource_Generator_Type_Constraint=t.Quest_Update_Column=t.Quest_Type_Update_Column=t.Quest_Type_Select_Column=t.Quest_Type_Enum=t.Quest_Type_Constraint=t.Quest_Step_Update_Column=t.Quest_Step_Type_Update_Column=t.Quest_Step_Type_Select_Column=t.Quest_Step_Type_Enum=t.Quest_Step_Type_Constraint=t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns=t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_And_Arguments_Columns=t.Quest_Step_Select_Column=t.Quest_Step_Constraint=t.Quest_Select_Column=t.Quest_Reward_Update_Column=t.Quest_Reward_Type_Update_Column=t.Quest_Reward_Type_Select_Column=t.Quest_Reward_Type_Enum=void 0,t.UserInfoDocument=t.UserInfoByIdDocument=t.UpdateTechnologyByIdDocument=t.TechnologiesDocument=t.CreateTechnologyDocument=t.SetNameByUserIdDocument=t.SetDisplayNameByUserIdDocument=t.SelfDocument=t.ResourcesDocument=t.UpdateQuestByIdDocument=t.QuestsDocument=t.CreateQuestDocument=t.TryInsertPlanetDocument=t.TerrainHexPalettesDocument=t.PlanetsByCelestialIdDocument=t.PlanetByIdDocument=t.CreatePlanetDocument=t.NpcsDocument=t.GetGalaxyByIdAndUnclaimedCelestialsDocument=t.GalaxyByIdSubDocument=t.GalaxyByIdDocument=t.GalaxiesWithOwnedCelestialsDocument=t.GalaxiesDocument=t.DeleteGalaxyByIdDocument=t.CreateGalaxyDocument=t.UnlockGalacticEmpireResourceDocument=t.GalacticEmpireResourcesDocument=t.ResourceGeneratorsByEmpireIdDocument=t.ResourceGeneratorsDocument=t.SubmitEmpireQuestCompletionRequestDocument=t.ProgressGalacticEmpireQuestStepByIdDocument=t.InitialMainQuestIdDocument=t.ActiveGalacticEmpireQuestsDocument=t.CompletedGalacticEmpireQuestsDocument=t.GalacticEmpireQuestByIdDocument=t.EmpiresWithoutQuestsDocument=t.CompleteQuestDocument=t.CompleteQuestStepDocument=t.CompleteGalacticEmpireQuestByIdDocument=t.AddGalacticEmpireQuestDocument=t.ActiveGalacticEmpireQuestsByEmpireIdDocument=t.UnlockGalacticEmpireNpcDocument=t.GalacticEmpireNpcsDocument=t.IncrementResourceDocument=t.IncrementGalacticEmpireResourcesDocument=t.GalacticEmpiresByUserIdDocument=t.GalacticEmpiresByGalaxyIdDocument=t.CreateGalacticEmpireDocument=t.SendNewMessageDocument=void 0;const r=a(4);!function(e){e.BackgroundNameKey="background_name_key",e.BackgroundPkey="background_pkey"}(t.Background_Constraint||(t.Background_Constraint={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Background_Select_Column||(t.Background_Select_Column={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Background_Update_Column||(t.Background_Update_Column={})),function(e){e.SystemPkey="system_pkey"}(t.Celestial_Constraint||(t.Celestial_Constraint={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.GalaxyId="galaxy_id",e.Id="id",e.Name="name",e.OwnerId="owner_id"}(t.Celestial_Select_Column||(t.Celestial_Select_Column={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.GalaxyId="galaxy_id",e.Id="id",e.Name="name",e.OwnerId="owner_id"}(t.Celestial_Update_Column||(t.Celestial_Update_Column={})),function(e){e.ChatMessagesPkey="chat_messages_pkey"}(t.Chat_Message_Constraint||(t.Chat_Message_Constraint={})),function(e){e.Id="id",e.Message="message",e.PosterId="poster_id",e.Timestamp="timestamp"}(t.Chat_Message_Select_Column||(t.Chat_Message_Select_Column={})),function(e){e.Id="id",e.Message="message",e.PosterId="poster_id",e.Timestamp="timestamp"}(t.Chat_Message_Update_Column||(t.Chat_Message_Update_Column={})),function(e){e.Asc="ASC",e.Desc="DESC"}(t.Cursor_Ordering||(t.Cursor_Ordering={})),function(e){e.FactionNameKey="faction_name_key",e.FactionPkey="faction_pkey"}(t.Faction_Constraint||(t.Faction_Constraint={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Faction_Select_Column||(t.Faction_Select_Column={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Faction_Update_Column||(t.Faction_Update_Column={})),function(e){e.GalacticEmpirePkey="galactic_empire_pkey",e.GalacticEmpireUserIdGalaxyIdKey="galactic_empire_user_id_galaxy_id_key"}(t.Galactic_Empire_Constraint||(t.Galactic_Empire_Constraint={})),function(e){e.GalacticEmpireNpcNpcIdGalacticEmpireIdKey="galactic_empire_npc_npc_id_galactic_empire_id_key",e.GalacticEmpireNpcPkey="galactic_empire_npc_pkey"}(t.Galactic_Empire_Npc_Constraint||(t.Galactic_Empire_Npc_Constraint={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.NpcId="npc_id"}(t.Galactic_Empire_Npc_Select_Column||(t.Galactic_Empire_Npc_Select_Column={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.NpcId="npc_id"}(t.Galactic_Empire_Npc_Update_Column||(t.Galactic_Empire_Npc_Update_Column={})),function(e){e.GalacticEmpireQuestPkey="galactic_empire_quest_pkey"}(t.Galactic_Empire_Quest_Constraint||(t.Galactic_Empire_Quest_Constraint={})),function(e){e.Completed="completed",e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.QuestId="quest_id",e.QuestStepId="quest_step_id"}(t.Galactic_Empire_Quest_Select_Column||(t.Galactic_Empire_Quest_Select_Column={})),function(e){e.Completed="completed"}(t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And_Arguments_Columns||(t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And_Arguments_Columns={})),function(e){e.Completed="completed"}(t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns||(t.Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns={})),function(e){e.Completed="completed",e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.QuestId="quest_id",e.QuestStepId="quest_step_id"}(t.Galactic_Empire_Quest_Update_Column||(t.Galactic_Empire_Quest_Update_Column={})),function(e){e.ResourceGeneratorPkey="resource_generator_pkey"}(t.Galactic_Empire_Resource_Generator_Constraint||(t.Galactic_Empire_Resource_Generator_Constraint={})),function(e){e.CreatedAt="created_at",e.GalacticEmpireId="galactic_empire_id",e.GeneratorTypeId="generator_type_id",e.Id="id",e.UpdatedAt="updated_at"}(t.Galactic_Empire_Resource_Generator_Select_Column||(t.Galactic_Empire_Resource_Generator_Select_Column={})),function(e){e.CreatedAt="created_at",e.GalacticEmpireId="galactic_empire_id",e.GeneratorTypeId="generator_type_id",e.Id="id",e.UpdatedAt="updated_at"}(t.Galactic_Empire_Resource_Generator_Update_Column||(t.Galactic_Empire_Resource_Generator_Update_Column={})),function(e){e.GalacticEmpireResourcesPkey="galactic_empire_resources_pkey",e.GalacticEmpireResourcesResourceTypeIdGalacticEmpireIdK="galactic_empire_resources_resource_type_id_galactic_empire_id_k"}(t.Galactic_Empire_Resources_Constraint||(t.Galactic_Empire_Resources_Constraint={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.ResourceTypeId="resource_type_id",e.UpdatedAt="updated_at",e.Value="value"}(t.Galactic_Empire_Resources_Select_Column||(t.Galactic_Empire_Resources_Select_Column={})),function(e){e.GalacticEmpireId="galactic_empire_id",e.Id="id",e.ResourceTypeId="resource_type_id",e.UpdatedAt="updated_at",e.Value="value"}(t.Galactic_Empire_Resources_Update_Column||(t.Galactic_Empire_Resources_Update_Column={})),function(e){e.BackgroundId="background_id",e.CelestialClaims="celestial_claims",e.FactionId="faction_id",e.GalaxyId="galaxy_id",e.HomeworldId="homeworld_id",e.Id="id",e.PlayableRaceId="playable_race_id",e.UserId="user_id"}(t.Galactic_Empire_Select_Column||(t.Galactic_Empire_Select_Column={})),function(e){e.BackgroundId="background_id",e.CelestialClaims="celestial_claims",e.FactionId="faction_id",e.GalaxyId="galaxy_id",e.HomeworldId="homeworld_id",e.Id="id",e.PlayableRaceId="playable_race_id",e.UserId="user_id"}(t.Galactic_Empire_Update_Column||(t.Galactic_Empire_Update_Column={})),function(e){e.GalaxyPkey="galaxy_pkey"}(t.Galaxy_Constraint||(t.Galaxy_Constraint={})),function(e){e.ArmWidth="arm_width",e.Arms="arms",e.CoreConcentrationFactor="core_concentration_factor",e.CoreRadiusFactor="core_radius_factor",e.Curvature="curvature",e.Id="id",e.Name="name",e.Radius="radius",e.Stars="stars"}(t.Galaxy_Select_Column||(t.Galaxy_Select_Column={})),function(e){e.ArmWidth="arm_width",e.Arms="arms",e.CoreConcentrationFactor="core_concentration_factor",e.CoreRadiusFactor="core_radius_factor",e.Curvature="curvature",e.Id="id",e.Name="name",e.Radius="radius",e.Stars="stars"}(t.Galaxy_Update_Column||(t.Galaxy_Update_Column={})),function(e){e.NpcPkey="npc_pkey"}(t.Npc_Constraint||(t.Npc_Constraint={})),function(e){e.FactionId="faction_id",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.RaceId="race_id"}(t.Npc_Select_Column||(t.Npc_Select_Column={})),function(e){e.FactionId="faction_id",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.RaceId="race_id"}(t.Npc_Update_Column||(t.Npc_Update_Column={})),function(e){e.Asc="asc",e.AscNullsFirst="asc_nulls_first",e.AscNullsLast="asc_nulls_last",e.Desc="desc",e.DescNullsFirst="desc_nulls_first",e.DescNullsLast="desc_nulls_last"}(t.Order_By||(t.Order_By={})),function(e){e.PlanetNameKey="planet_name_key",e.PlanetPkey="planet_pkey"}(t.Planet_Constraint||(t.Planet_Constraint={})),function(e){e.AtmosphericDistance="atmospheric_distance",e.CelestialId="celestial_id",e.Id="id",e.Name="name",e.OwnerId="owner_id",e.Radius="radius",e.TerrainBias="terrain_bias",e.TerrainHexPaletteId="terrain_hex_palette_id",e.TextureResolution="texture_resolution"}(t.Planet_Select_Column||(t.Planet_Select_Column={})),function(e){e.AtmosphericDistance="atmospheric_distance",e.CelestialId="celestial_id",e.Id="id",e.Name="name",e.OwnerId="owner_id",e.Radius="radius",e.TerrainBias="terrain_bias",e.TerrainHexPaletteId="terrain_hex_palette_id",e.TextureResolution="texture_resolution"}(t.Planet_Update_Column||(t.Planet_Update_Column={})),function(e){e.PlanetaryRingPkey="planetary_ring_pkey"}(t.Planetary_Ring_Constraint||(t.Planetary_Ring_Constraint={})),function(e){e.Colors="colors",e.Id="id",e.InnerRadius="inner_radius",e.OuterRadius="outer_radius",e.Resolution="resolution",e.Rotation="rotation",e.TerrainBias="terrain_bias",e.Type="type"}(t.Planetary_Ring_Select_Column||(t.Planetary_Ring_Select_Column={})),function(e){e.Colors="colors",e.Id="id",e.InnerRadius="inner_radius",e.OuterRadius="outer_radius",e.Resolution="resolution",e.Rotation="rotation",e.TerrainBias="terrain_bias",e.Type="type"}(t.Planetary_Ring_Update_Column||(t.Planetary_Ring_Update_Column={})),function(e){e.PlayableRacePkey="playable_race_pkey"}(t.Playable_Race_Constraint||(t.Playable_Race_Constraint={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Playable_Race_Select_Column||(t.Playable_Race_Select_Column={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name"}(t.Playable_Race_Update_Column||(t.Playable_Race_Update_Column={})),function(e){e.QuestNameKey="quest_name_key",e.QuestPkey="quest_pkey"}(t.Quest_Constraint||(t.Quest_Constraint={})),function(e){e.QuestRewardPkey="quest_reward_pkey"}(t.Quest_Reward_Constraint||(t.Quest_Reward_Constraint={})),function(e){e.Id="id",e.NpcUnlockId="npc_unlock_id",e.QuestId="quest_id",e.ResourceAccrualAmount="resource_accrual_amount",e.ResourceAccrualTypeId="resource_accrual_type_id",e.ResourceUnlockId="resource_unlock_id",e.Type="type"}(t.Quest_Reward_Select_Column||(t.Quest_Reward_Select_Column={})),function(e){e.QuestRewardTypePkey="quest_reward_type_pkey"}(t.Quest_Reward_Type_Constraint||(t.Quest_Reward_Type_Constraint={})),function(e){e.NpcUnlock="npc_unlock",e.ResourceAccrual="resource_accrual",e.ResourceUnlock="resource_unlock"}(t.Quest_Reward_Type_Enum||(t.Quest_Reward_Type_Enum={})),function(e){e.Description="description",e.Value="value"}(t.Quest_Reward_Type_Select_Column||(t.Quest_Reward_Type_Select_Column={})),function(e){e.Description="description",e.Value="value"}(t.Quest_Reward_Type_Update_Column||(t.Quest_Reward_Type_Update_Column={})),function(e){e.Id="id",e.NpcUnlockId="npc_unlock_id",e.QuestId="quest_id",e.ResourceAccrualAmount="resource_accrual_amount",e.ResourceAccrualTypeId="resource_accrual_type_id",e.ResourceUnlockId="resource_unlock_id",e.Type="type"}(t.Quest_Reward_Update_Column||(t.Quest_Reward_Update_Column={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Initial="initial",e.Name="name",e.NextQuestInChain="next_quest_in_chain",e.Type="type"}(t.Quest_Select_Column||(t.Quest_Select_Column={})),function(e){e.QuestStepPkey="quest_step_pkey"}(t.Quest_Step_Constraint||(t.Quest_Step_Constraint={})),function(e){e.Description="description",e.Id="id",e.Initial="initial",e.NextStepInQuest="next_step_in_quest",e.NpcContactId="npc_contact_id",e.QuestId="quest_id",e.ResourceCostAmount="resource_cost_amount",e.ResourceCostId="resource_cost_id",e.Type="type"}(t.Quest_Step_Select_Column||(t.Quest_Step_Select_Column={})),function(e){e.Initial="initial"}(t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_And_Arguments_Columns||(t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_And_Arguments_Columns={})),function(e){e.Initial="initial"}(t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns||(t.Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns={})),function(e){e.QuestStepTypePkey="quest_step_type_pkey"}(t.Quest_Step_Type_Constraint||(t.Quest_Step_Type_Constraint={})),function(e){e.Cta="cta",e.NpcContact="npc_contact",e.ResourceCost="resource_cost"}(t.Quest_Step_Type_Enum||(t.Quest_Step_Type_Enum={})),function(e){e.Description="description",e.Value="value"}(t.Quest_Step_Type_Select_Column||(t.Quest_Step_Type_Select_Column={})),function(e){e.Description="description",e.Value="value"}(t.Quest_Step_Type_Update_Column||(t.Quest_Step_Type_Update_Column={})),function(e){e.Description="description",e.Id="id",e.Initial="initial",e.NextStepInQuest="next_step_in_quest",e.NpcContactId="npc_contact_id",e.QuestId="quest_id",e.ResourceCostAmount="resource_cost_amount",e.ResourceCostId="resource_cost_id",e.Type="type"}(t.Quest_Step_Update_Column||(t.Quest_Step_Update_Column={})),function(e){e.QuestTypePkey="quest_type_pkey"}(t.Quest_Type_Constraint||(t.Quest_Type_Constraint={})),function(e){e.Main="main",e.Race="race",e.Side="side"}(t.Quest_Type_Enum||(t.Quest_Type_Enum={})),function(e){e.Value="value"}(t.Quest_Type_Select_Column||(t.Quest_Type_Select_Column={})),function(e){e.Value="value"}(t.Quest_Type_Update_Column||(t.Quest_Type_Update_Column={})),function(e){e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Initial="initial",e.Name="name",e.NextQuestInChain="next_quest_in_chain",e.Type="type"}(t.Quest_Update_Column||(t.Quest_Update_Column={})),function(e){e.ResourceGeneratorTypePkey="resource_generator_type_pkey"}(t.Resource_Generator_Type_Constraint||(t.Resource_Generator_Type_Constraint={})),function(e){e.Description="description",e.GenerationRate="generation_rate",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.ResourceType_1Id="resource_type_1_id",e.ResourceType_2Id="resource_type_2_id"}(t.Resource_Generator_Type_Select_Column||(t.Resource_Generator_Type_Select_Column={})),function(e){e.Description="description",e.GenerationRate="generation_rate",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.ResourceType_1Id="resource_type_1_id",e.ResourceType_2Id="resource_type_2_id"}(t.Resource_Generator_Type_Update_Column||(t.Resource_Generator_Type_Update_Column={})),function(e){e.ResourceTypesPkey="resource_types_pkey",e.ResourceTypesTypeKey="resource_types_type_key"}(t.Resource_Type_Constraint||(t.Resource_Type_Constraint={})),function(e){e.Id="id",e.ImageUrl="image_url",e.ImageUrlPixel="image_url_pixel",e.Type="type"}(t.Resource_Type_Select_Column||(t.Resource_Type_Select_Column={})),function(e){e.Id="id",e.ImageUrl="image_url",e.ImageUrlPixel="image_url_pixel",e.Type="type"}(t.Resource_Type_Update_Column||(t.Resource_Type_Update_Column={})),function(e){e.TechnologyNameKey="technology_name_key",e.TechnologyPkey="technology_pkey"}(t.Technology_Constraint||(t.Technology_Constraint={})),function(e){e.Children="children",e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.ResearchCost="research_cost",e.Root="root"}(t.Technology_Select_Column||(t.Technology_Select_Column={})),function(e){e.Children="children",e.Description="description",e.Id="id",e.ImageUrl="image_url",e.Name="name",e.ResearchCost="research_cost",e.Root="root"}(t.Technology_Update_Column||(t.Technology_Update_Column={})),function(e){e.TerrainHexPaletteNameKey="terrain_hex_palette_name_key",e.TerrainHexPalettePkey="terrain_hex_palette_pkey"}(t.Terrain_Hex_Palette_Constraint||(t.Terrain_Hex_Palette_Constraint={})),function(e){e.Forest="forest",e.Grass="grass",e.Id="id",e.Name="name",e.Sand="sand",e.Water="water"}(t.Terrain_Hex_Palette_Select_Column||(t.Terrain_Hex_Palette_Select_Column={})),function(e){e.Forest="forest",e.Grass="grass",e.Id="id",e.Name="name",e.Sand="sand",e.Water="water"}(t.Terrain_Hex_Palette_Update_Column||(t.Terrain_Hex_Palette_Update_Column={})),function(e){e.UserInfoDisplayNameKey="user_info_display_name_key",e.UserPkey="user_pkey"}(t.User_Info_Constraint||(t.User_Info_Constraint={})),function(e){e.AvatarUrl="avatar_url",e.DisplayName="display_name",e.FreeClaims="free_claims",e.Id="id",e.Name="name",e.Nickname="nickname",e.SecretSettingTest="secret_setting_test"}(t.User_Info_Select_Column||(t.User_Info_Select_Column={})),function(e){e.AvatarUrl="avatar_url",e.DisplayName="display_name",e.FreeClaims="free_claims",e.Id="id",e.Name="name",e.Nickname="nickname",e.SecretSettingTest="secret_setting_test"}(t.User_Info_Update_Column||(t.User_Info_Update_Column={})),function(e){e.AvatarUrl="avatar_url",e.DisplayName="display_name",e.FreeClaims="free_claims",e.Id="id",e.Name="name",e.Nickname="nickname",e.SecretSettingTest="secret_setting_test"}(t.User_Me_Select_Column||(t.User_Me_Select_Column={})),function(e){e.SecretSettingTest="secret_setting_test",e.UserId="user_id"}(t.User_Private_Select_Column||(t.User_Private_Select_Column={})),t.GalacticEmpireFieldsFragmentDoc=r.gql`
    fragment GalacticEmpireFields on galactic_empire {
  id
  user_id
  background {
    name
    image_url
    id
    description
  }
  faction {
    description
    id
    image_url
    name
  }
  playable_race {
    description
    id
    image_url
    name
  }
  galaxy {
    name
    id
  }
  celestials {
    id
    name
    planets {
      name
    }
  }
}
    `,t.CelestialFieldsFragmentDoc=r.gql`
    fragment CelestialFields on celestial {
  id
  name
  owner_id
  user_info {
    display_name
    name
  }
}
    `,t.GalaxyFieldsFragmentDoc=r.gql`
    fragment GalaxyFields on galaxy {
  id
  name
  curvature
  core_radius_factor
  core_concentration_factor
  arms
  arm_width
  radius
  stars
  galactic_empires {
    ...GalacticEmpireFields
  }
  celestials {
    ...CelestialFields
  }
}
    ${t.GalacticEmpireFieldsFragmentDoc}
${t.CelestialFieldsFragmentDoc}`,t.GalacticEmpireQuestFieldsFragmentDoc=r.gql`
    fragment GalacticEmpireQuestFields on galactic_empire_quest {
  id
  completed
  quest {
    id
    type
    description
    name
    rewards {
      npc_unlock_id
      resource_accrual_amount
      resource_accrual_type_id
      resource_unlock_id
      type
    }
    next_quest {
      name
    }
    steps {
      id
      type
      description
      initial
      resource_cost_id
      resource_cost_amount
      npc_contact_id
      next_step_in_quest
    }
  }
  quest_step_id
}
    `,t.QuestFieldsFragmentDoc=r.gql`
    fragment QuestFields on quest {
  name
  initial
  id
  description
  next_quest_in_chain
  type
  image_url
  steps_aggregate {
    aggregate {
      count
    }
  }
  rewards {
    resource_unlock_id
    resource_accrual_type_id
    resource_accrual_amount
    npc_unlock_id
    type
  }
}
    `,t.TechFieldsFragmentDoc=r.gql`
    fragment TechFields on technology {
  id
  root
  name
  description
  children
  research_cost
  image_url
}
    `,t.CelestialByIdDocument=r.gql`
    query CelestialById($id: String!) {
  celestial_by_pk(id: $id) {
    id
    name
    owner_id
    user_info {
      display_name
      id
      avatar_url
    }
    planets {
      id
      name
      radius
      rings {
        id
        type
        colors
      }
      terrain_bias
      texture_resolution
      atmospheric_distance
      terrain_hex_palette {
        forest
        grass
        name
        sand
        water
      }
    }
    galactic_empire {
      ...GalacticEmpireFields
    }
  }
}
    ${t.GalacticEmpireFieldsFragmentDoc}`,t.CelestialsDocument=r.gql`
    subscription Celestials {
  celestial {
    ...CelestialFields
  }
}
    ${t.CelestialFieldsFragmentDoc}`,t.CelestialsByGalaxyIdDocument=r.gql`
    subscription CelestialsByGalaxyId($id: uuid!) {
  galaxy_by_pk(id: $id) {
    celestials {
      name
      id
      owner_id
    }
    celestials_aggregate(distinct_on: owner_id) {
      nodes {
        owner_id
        user_info {
          display_name
          avatar_url
        }
      }
    }
  }
}
    `,t.CreateEmpireOriginCelestialDocument=r.gql`
    mutation CreateEmpireOriginCelestial($galaxy_id: String!, $galacticEmpireId: String!) {
  createEmpireOriginCelestial(
    galaxy_id: $galaxy_id
    galactic_empire_id: $galacticEmpireId
  ) {
    insertedCelestialId
    insertedCelestialName
  }
}
    `,t.TryInsertClaimedCelestialDocument=r.gql`
    mutation TryInsertClaimedCelestial($galaxy_id: uuid!, $galactic_empire_id: uuid!, $id: String!, $name: String!, $owner_id: String!) {
  insert_celestial_one(
    object: {galaxy_id: $galaxy_id, id: $id, name: $name, owner_id: $owner_id, galactic_empire_id: $galactic_empire_id}
    on_conflict: {constraint: system_pkey, update_columns: owner_id}
  ) {
    galaxy_id
    id
    name
    owner_id
    galactic_empire_id
  }
}
    `,t.CharacterDataDocument=r.gql`
    query CharacterData {
  playable_race {
    id
    name
    description
    image_url
  }
  faction {
    id
    name
    description
    image_url
  }
  background {
    id
    name
    description
    image_url
  }
}
    `,t.GetChatMessagesDocument=r.gql`
    subscription GetChatMessages {
  chat_message(order_by: {timestamp: desc}, limit: 200) {
    timestamp
    id
    message
    poster_id
    user_info {
      nickname
      id
      display_name
    }
  }
}
    `,t.LatestMessageDocument=r.gql`
    subscription LatestMessage {
  chat_message(limit: 1, order_by: {timestamp: desc}) {
    id
    message
  }
}
    `,t.SendNewMessageDocument=r.gql`
    mutation SendNewMessage($message: String) {
  insert_chat_message_one(object: {message: $message}) {
    message
  }
}
    `,t.CreateGalacticEmpireDocument=r.gql`
    mutation CreateGalacticEmpire($input: galactic_empire_insert_input!) {
  insert_galactic_empire_one(object: $input) {
    id
  }
}
    `,t.GalacticEmpiresByGalaxyIdDocument=r.gql`
    query GalacticEmpiresByGalaxyId($galaxyId: uuid!) {
  galactic_empire(where: {galaxy_id: {_eq: $galaxyId}}) {
    ...GalacticEmpireFields
  }
}
    ${t.GalacticEmpireFieldsFragmentDoc}`,t.GalacticEmpiresByUserIdDocument=r.gql`
    subscription GalacticEmpiresByUserId($userId: String!) {
  galactic_empire(where: {user_id: {_eq: $userId}}) {
    ...GalacticEmpireFields
  }
}
    ${t.GalacticEmpireFieldsFragmentDoc}`,t.IncrementGalacticEmpireResourcesDocument=r.gql`
    mutation IncrementGalacticEmpireResources($galacticEmpireId: uuid!, $galacticCreditsIncrement: Int!, $commonMetalsIncrement: Int!, $rareMetalsIncrement: Int!, $hydrocarbonsIncrement: Int!, $voidMatterIncrement: Int!) {
  common_metals: update_galactic_empire_resources(
    _inc: {value: $commonMetalsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "common metals"}}}
  ) {
    affected_rows
  }
  galactic_credits: update_galactic_empire_resources(
    _inc: {value: $galacticCreditsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "galactic credits"}}}
  ) {
    affected_rows
  }
  hydrocarbons: update_galactic_empire_resources(
    _inc: {value: $hydrocarbonsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "hydrocarbons"}}}
  ) {
    affected_rows
  }
  rare_metals: update_galactic_empire_resources(
    _inc: {value: $rareMetalsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "rare metals"}}}
  ) {
    affected_rows
  }
  void_matter: update_galactic_empire_resources(
    _inc: {value: $voidMatterIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "void matter"}}}
  ) {
    affected_rows
  }
}
    `,t.IncrementResourceDocument=r.gql`
    mutation IncrementResource($galacticEmpireId: uuid!, $resourceType: String!, $increment: Int!) {
  update_galactic_empire_resources(
    _inc: {value: $increment}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: $resourceType}}}
  ) {
    affected_rows
  }
}
    `,t.GalacticEmpireNpcsDocument=r.gql`
    subscription GalacticEmpireNpcs($empireId: uuid!) {
  galactic_empire_npc(where: {galactic_empire_id: {_eq: $empireId}}) {
    npc {
      id
      name
      image_url
      playable_race {
        name
        id
      }
      faction {
        name
        id
      }
    }
  }
}
    `,t.UnlockGalacticEmpireNpcDocument=r.gql`
    mutation UnlockGalacticEmpireNpc($empireId: uuid!, $npcId: uuid!) {
  insert_galactic_empire_npc_one(
    object: {galactic_empire_id: $empireId, npc_id: $npcId}
  ) {
    npc_id
    galactic_empire_id
  }
}
    `,t.ActiveGalacticEmpireQuestsByEmpireIdDocument=r.gql`
    subscription ActiveGalacticEmpireQuestsByEmpireId($id: uuid!) {
  galactic_empire_quest(where: {galactic_empire_id: {_eq: $id}}) {
    quest_step_id
    id
    quest {
      rewards {
        npc_unlock_id
        type
        resource_unlock_id
        resource_accrual_type_id
        resource_accrual_amount
      }
      steps {
        next_step_in_quest
        npc_contact_id
        type
        resource_cost_amount
        resource_cost_id
      }
      next_quest_in_chain
      quest_type {
        value
      }
    }
  }
}
    `,t.AddGalacticEmpireQuestDocument=r.gql`
    mutation AddGalacticEmpireQuest($input: galactic_empire_quest_insert_input!) {
  insert_galactic_empire_quest_one(object: $input) {
    quest_id
    galactic_empire_id
  }
}
    `,t.CompleteGalacticEmpireQuestByIdDocument=r.gql`
    mutation CompleteGalacticEmpireQuestById($questId: uuid!) {
  update_galactic_empire_quest_by_pk(
    pk_columns: {id: $questId}
    _set: {completed: true}
  ) {
    completed
    quest_id
  }
}
    `,t.CompleteQuestStepDocument=r.gql`
    mutation CompleteQuestStep($empireQuestId: String!) {
  progressQuestStep(empire_quest_id: $empireQuestId) {
    next_step_in_quest_added
    quest_id
  }
}
    `,t.CompleteQuestDocument=r.gql`
    mutation CompleteQuest($empireQuestId: String!) {
  completeQuest(empire_quest_id: $empireQuestId) {
    next_quest_in_chain_added
    quest_id
    rewards {
      npc_unlock_id
      resource_accrual_amount
      resource_accrual_type_id
      resource_unlock_id
      type
    }
  }
}
    `,t.EmpiresWithoutQuestsDocument=r.gql`
    subscription EmpiresWithoutQuests {
  galactic_empire_aggregate(where: {_not: {quests: {}}}) {
    nodes {
      id
    }
  }
}
    `,t.GalacticEmpireQuestByIdDocument=r.gql`
    query GalacticEmpireQuestById($empireQuestId: uuid!) {
  galactic_empire_quest_by_pk(id: $empireQuestId) {
    completed
    quest_step_id
    quest {
      steps {
        next_step_in_quest
        id
        npc_contact_id
        resource_cost_amount
        resource_cost_id
        type
      }
      rewards {
        npc_unlock_id
        resource_accrual_amount
        resource_accrual_type_id
        resource_unlock_id
        type
      }
      quest_type {
        value
      }
      next_quest {
        id
        steps(where: {initial: {_eq: true}}) {
          id
        }
      }
    }
    galactic_empire {
      id
      resources {
        value
        resource_type {
          type
          id
        }
      }
    }
  }
}
    `,t.CompletedGalacticEmpireQuestsDocument=r.gql`
    subscription CompletedGalacticEmpireQuests($empireId: uuid!) {
  galactic_empire_quest(
    where: {galactic_empire_id: {_eq: $empireId}, completed: {_eq: true}}
  ) {
    ...GalacticEmpireQuestFields
  }
}
    ${t.GalacticEmpireQuestFieldsFragmentDoc}`,t.ActiveGalacticEmpireQuestsDocument=r.gql`
    subscription ActiveGalacticEmpireQuests($empireId: uuid!) {
  galactic_empire_quest(
    where: {galactic_empire_id: {_eq: $empireId}, completed: {_eq: false}}
  ) {
    ...GalacticEmpireQuestFields
  }
}
    ${t.GalacticEmpireQuestFieldsFragmentDoc}`,t.InitialMainQuestIdDocument=r.gql`
    query InitialMainQuestId {
  quest(where: {type: {_eq: main}, initial: {_eq: true}}) {
    id
    steps(where: {initial: {_eq: true}}) {
      id
    }
  }
}
    `,t.ProgressGalacticEmpireQuestStepByIdDocument=r.gql`
    mutation ProgressGalacticEmpireQuestStepById($questId: uuid!, $stepId: uuid!) {
  update_galactic_empire_quest_by_pk(
    pk_columns: {id: $questId}
    _set: {quest_step_id: $stepId}
  ) {
    completed
    quest_id
  }
}
    `,t.SubmitEmpireQuestCompletionRequestDocument=r.gql`
    mutation SubmitEmpireQuestCompletionRequest($empireQuestId: String!) {
  completeQuest(empire_quest_id: $empireQuestId) {
    quest_id
    next_quest_in_chain_added
  }
}
    `,t.ResourceGeneratorsDocument=r.gql`
    subscription ResourceGenerators {
  galactic_empire_resource_generator {
    created_at
    resource_generator_type {
      generation_rate
      resource_type {
        id
        type
      }
      name
      id
      resource_type_2 {
        id
        type
      }
    }
    galactic_empire_id
  }
}
    `,t.ResourceGeneratorsByEmpireIdDocument=r.gql`
    subscription ResourceGeneratorsByEmpireId($empireId: uuid!) {
  galactic_empire_resource_generator(
    where: {galactic_empire_id: {_eq: $empireId}}
  ) {
    created_at
    resource_generator_type {
      generation_rate
      resource_type {
        id
        type
      }
      name
      id
      resource_type_2 {
        id
        type
      }
    }
    galactic_empire_id
  }
}
    `,t.GalacticEmpireResourcesDocument=r.gql`
    subscription GalacticEmpireResources($empireId: uuid!) {
  galactic_empire_resources(where: {galactic_empire_id: {_eq: $empireId}}) {
    value
    resource_type {
      id
      type
    }
    id
  }
}
    `,t.UnlockGalacticEmpireResourceDocument=r.gql`
    mutation UnlockGalacticEmpireResource($empireId: uuid!, $resourceTypeId: uuid!) {
  insert_galactic_empire_resources_one(
    object: {galactic_empire_id: $empireId, resource_type_id: $resourceTypeId, value: 0}
  ) {
    galactic_empire_id
    resource_type_id
  }
}
    `,t.CreateGalaxyDocument=r.gql`
    mutation CreateGalaxy($input: galaxy_insert_input!) {
  insert_galaxy_one(object: $input) {
    ...GalaxyFields
  }
}
    ${t.GalaxyFieldsFragmentDoc}`,t.DeleteGalaxyByIdDocument=r.gql`
    mutation DeleteGalaxyById($id: uuid!) {
  delete_galaxy_by_pk(id: $id) {
    id
    name
  }
}
    `,t.GalaxiesDocument=r.gql`
    subscription Galaxies {
  galaxy {
    ...GalaxyFields
  }
}
    ${t.GalaxyFieldsFragmentDoc}`,t.GalaxiesWithOwnedCelestialsDocument=r.gql`
    subscription GalaxiesWithOwnedCelestials($userId: String!) {
  galaxy_aggregate(where: {celestials: {owner_id: {_eq: $userId}}}) {
    nodes {
      id
    }
  }
}
    `,t.GalaxyByIdDocument=r.gql`
    query GalaxyById($id: uuid!) {
  galaxy_by_pk(id: $id) {
    ...GalaxyFields
  }
}
    ${t.GalaxyFieldsFragmentDoc}`,t.GalaxyByIdSubDocument=r.gql`
    subscription GalaxyByIdSub($id: uuid!) {
  galaxy_by_pk(id: $id) {
    ...GalaxyFields
  }
}
    ${t.GalaxyFieldsFragmentDoc}`,t.GetGalaxyByIdAndUnclaimedCelestialsDocument=r.gql`
    query GetGalaxyByIdAndUnclaimedCelestials($galaxyId: uuid!) {
  galaxy_by_pk(id: $galaxyId) {
    id
    stars
  }
  celestial(
    where: {galaxy_id: {_eq: $galaxyId}, _and: {owner_id: {_is_null: true}}}
  ) {
    id
  }
}
    `,t.NpcsDocument=r.gql`
    query Npcs {
  npc {
    id
    image_url
    name
  }
}
    `,t.CreatePlanetDocument=r.gql`
    mutation CreatePlanet($input: PlanetCreationInput!) {
  createPlanet(input: $input) {
    createdPlanet {
      id
      name
      owner_id
    }
  }
}
    `,t.PlanetByIdDocument=r.gql`
    query PlanetById($id: uuid!) {
  planet_by_pk(id: $id) {
    atmospheric_distance
    id
    name
    owner_id
    radius
    terrain_bias
    terrain_hex_palette {
      forest
      grass
      name
      sand
      water
      id
    }
    texture_resolution
    rings {
      colors
      id
      inner_radius
      outer_radius
      resolution
      rotation
      terrain_bias
      type
    }
    user_info {
      avatar_url
      name
      nickname
      id
    }
    celestial {
      name
      planets_aggregate {
        aggregate {
          count
        }
      }
      galactic_empire {
        ...GalacticEmpireFields
      }
    }
  }
}
    ${t.GalacticEmpireFieldsFragmentDoc}`,t.PlanetsByCelestialIdDocument=r.gql`
    query PlanetsByCelestialId($id: String!) {
  celestial_by_pk(id: $id) {
    planets {
      name
      id
      radius
      rings {
        colors
        id
        inner_radius
        outer_radius
        resolution
        rotation
        terrain_bias
        type
      }
      owner_id
      terrain_bias
      terrain_hex_palette_id
      texture_resolution
    }
  }
}
    `,t.TerrainHexPalettesDocument=r.gql`
    query TerrainHexPalettes {
  terrain_hex_palette {
    forest
    grass
    id
    name
    sand
    water
  }
}
    `,t.TryInsertPlanetDocument=r.gql`
    mutation TryInsertPlanet($input: planet_insert_input!) {
  insert_planet_one(object: $input) {
    id
    name
    owner_id
  }
}
    `,t.CreateQuestDocument=r.gql`
    mutation CreateQuest($input: quest_insert_input!) {
  insert_quest_one(object: $input) {
    ...QuestFields
  }
}
    ${t.QuestFieldsFragmentDoc}`,t.QuestsDocument=r.gql`
    query Quests {
  quest {
    ...QuestFields
  }
}
    ${t.QuestFieldsFragmentDoc}`,t.UpdateQuestByIdDocument=r.gql`
    mutation UpdateQuestById($id: uuid!, $input: quest_set_input!) {
  update_quest_by_pk(pk_columns: {id: $id}, _set: $input) {
    ...QuestFields
  }
}
    ${t.QuestFieldsFragmentDoc}`,t.ResourcesDocument=r.gql`
    query Resources {
  resource_type {
    type
    id
    image_url
    image_url_pixel
  }
}
    `,t.SelfDocument=r.gql`
    query Self {
  user_me {
    display_name
    id
    name
    nickname
    secret_setting_test
    avatar_url
  }
}
    `,t.SetDisplayNameByUserIdDocument=r.gql`
    mutation SetDisplayNameByUserID($id: String!, $display_name: String!) {
  update_user_info_by_pk(
    pk_columns: {id: $id}
    _set: {display_name: $display_name}
  ) {
    display_name
  }
}
    `,t.SetNameByUserIdDocument=r.gql`
    mutation SetNameByUserID($display_name: String = "") {
  setDisplayName(display_name: $display_name) {
    updatedName
  }
}
    `,t.CreateTechnologyDocument=r.gql`
    mutation CreateTechnology($input: technology_insert_input!) {
  insert_technology_one(object: $input) {
    ...TechFields
  }
}
    ${t.TechFieldsFragmentDoc}`,t.TechnologiesDocument=r.gql`
    query Technologies {
  technology {
    ...TechFields
  }
}
    ${t.TechFieldsFragmentDoc}`,t.UpdateTechnologyByIdDocument=r.gql`
    mutation UpdateTechnologyById($id: uuid!, $input: technology_set_input!) {
  update_technology_by_pk(pk_columns: {id: $id}, _set: $input) {
    ...TechFields
  }
}
    ${t.TechFieldsFragmentDoc}`,t.UserInfoByIdDocument=r.gql`
    query UserInfoById($userId: String!) {
  user_info_by_pk(id: $userId) {
    avatar_url
    name
  }
}
    `,t.UserInfoDocument=r.gql`
    query UserInfo {
  user_info {
    avatar_url
    id
    name
    display_name
  }
}
    `},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HasuraEmpireResourceModifiers=t.resourceModificationFactory=void 0;const r=a(18),i=a(15);t.resourceModificationFactory=(e,t,a)=>({...e,[t]:a});class HasuraEmpireResourceModifiers extends i.DataSource{constructor(e){super(),this.incrementEmpireResources=({galacticEmpireId:e,galacticCreditsIncrement:t,commonMetalsIncrement:a,rareMetalsIncrement:i,hydrocarbonsIncrement:n,voidMatterIncrement:o})=>this.client.mutate({mutation:r.IncrementGalacticEmpireResourcesDocument,variables:{galacticEmpireId:e,galacticCreditsIncrement:t,commonMetalsIncrement:a,hydrocarbonsIncrement:n,rareMetalsIncrement:i,voidMatterIncrement:o}}),this.client=e}}t.HasuraEmpireResourceModifiers=HasuraEmpireResourceModifiers},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HasuraQuestProgression=void 0;const r=a(18),i=a(15);class HasuraQuestProgression extends i.DataSource{constructor(e){super(),this.getGalacticEmpireQuestById=async e=>this.client.query({query:r.GalacticEmpireQuestByIdDocument,variables:{empireQuestId:e}}),this.progressQuestStep=(e,t)=>this.client.mutate({mutation:r.ProgressGalacticEmpireQuestStepByIdDocument,variables:{stepId:t,questId:e}}),this.addQuest=e=>this.client.mutate({mutation:r.AddGalacticEmpireQuestDocument,variables:{input:e}}),this.completeQuest=e=>this.client.mutate({mutation:r.CompleteGalacticEmpireQuestByIdDocument,variables:{questId:e}}),this.unlockEmpireResource=(e,t)=>this.client.mutate({mutation:r.UnlockGalacticEmpireResourceDocument,variables:{empireId:e,resourceTypeId:t}}),this.unlockEmpireNpc=(e,t)=>this.client.mutate({mutation:r.UnlockGalacticEmpireNpcDocument,variables:{empireId:e,npcId:t}}),this.client=e}}t.HasuraQuestProgression=HasuraQuestProgression},(e,t,a)=>{var r,i,n;Object.defineProperty(t,"__esModule",{value:!0}),t.CelestialManagementResolver=void 0;const o=a(1);a(23);const s=a(12),c=a(24),_=a(25),l=a(26);let u=class CelestialManagementResolver{async createPlanet(e,t){var a,r;if(!e.id)throw new Error("User id not in token");const i=(0,l.planetValidator)(t);if(i.length)throw new Error(`Planet input validation failed. ${i.map((({issue:e},t)=>`\n${t+1}. ${e}`))}`);const n={...null==t?void 0:t.rings};(null===(r=null===(a=null==t?void 0:t.rings)||void 0===a?void 0:a.data)||void 0===r?void 0:r.length)&&(n.data=t.rings.data.map((({terrain_bias:e,rotation:t,colors:a,...r})=>({...r,colors:`{${a}}`,terrain_bias:`{${e}}`,rotation:`{${t}}`}))));const o=(await e.dataSources.hasuraAPI.tryInsertPlanetToCelestial({input:{...t,terrain_bias:`{${t.terrain_bias}}`,rings:n}})).data,s=null==o?void 0:o.insert_planet_one;if(!s)throw new Error("Failed to insert planet");const c=new _.CelestialManagement;return c.createdPlanet=s,c}};o.__decorate([(0,s.Authorized)("user"),(0,s.Mutation)((e=>_.CelestialManagement),{nullable:!0}),o.__param(0,(0,s.Ctx)()),o.__param(1,(0,s.Arg)("input")),o.__metadata("design:type",Function),o.__metadata("design:paramtypes",["function"==typeof(r=void 0!==c.Context&&c.Context)?r:Object,"function"==typeof(i=void 0!==_.PlanetCreationInput&&_.PlanetCreationInput)?i:Object]),o.__metadata("design:returntype","function"==typeof(n="undefined"!=typeof Promise&&Promise)?n:Object)],u.prototype,"createPlanet",null),u=o.__decorate([(0,s.Resolver)((e=>_.CelestialManagement))],u),t.CelestialManagementResolver=u},e=>{e.exports=require("reflect-metadata")},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CelestialManagement=t.PartialPlanet=t.PlanetCreationInput=t.RingInsertInputWrapper=t.RingInsertInput=void 0;const r=a(1),i=a(12);let n=class RingInsertInput{};r.__decorate([(0,i.Field)((e=>[String])),r.__metadata("design:type",Array)],n.prototype,"colors",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],n.prototype,"inner_radius",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],n.prototype,"outer_radius",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],n.prototype,"resolution",void 0),r.__decorate([(0,i.Field)((e=>[i.Float])),r.__metadata("design:type",Array)],n.prototype,"rotation",void 0),r.__decorate([(0,i.Field)((e=>[i.Float])),r.__metadata("design:type",Array)],n.prototype,"terrain_bias",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],n.prototype,"type",void 0),n=r.__decorate([(0,i.InputType)()],n),t.RingInsertInput=n;let o=class RingInsertInputWrapper{};r.__decorate([(0,i.Field)((()=>[n])),r.__metadata("design:type",Array)],o.prototype,"data",void 0),o=r.__decorate([(0,i.InputType)()],o),t.RingInsertInputWrapper=o;let s=class PlanetCreationInput{};r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],s.prototype,"celestial_id",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],s.prototype,"id",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],s.prototype,"name",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],s.prototype,"owner_id",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],s.prototype,"radius",void 0),r.__decorate([(0,i.Field)((()=>o)),r.__metadata("design:type",o)],s.prototype,"rings",void 0),r.__decorate([(0,i.Field)((e=>[i.Float])),r.__metadata("design:type",Array)],s.prototype,"terrain_bias",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],s.prototype,"terrain_hex_palette_id",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],s.prototype,"texture_resolution",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",Number)],s.prototype,"atmospheric_distance",void 0),s=r.__decorate([(0,i.InputType)()],s),t.PlanetCreationInput=s;let c=class PartialPlanet{};r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],c.prototype,"id",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],c.prototype,"name",void 0),r.__decorate([(0,i.Field)(),r.__metadata("design:type",String)],c.prototype,"owner_id",void 0),c=r.__decorate([(0,i.ObjectType)()],c),t.PartialPlanet=c;let _=class CelestialManagement{};r.__decorate([(0,i.Field)(),r.__metadata("design:type",c)],_.prototype,"createdPlanet",void 0),_=r.__decorate([(0,i.ObjectType)()],_),t.CelestialManagement=_},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.planetValidator=void 0;t.planetValidator=({texture_resolution:e,terrain_bias:t})=>{const a=[];return e<64&&a.push({field:"texture_resolution",issue:`TEXTURE RESOLUTION: ${e} is below the minimum of 64.`}),(4!==t.length||t.some((e=>e>1)))&&a.push({field:"terrain_bias",issue:`TERRAIN BIAS: invalid value of [${t}] detected. Ensure that exactly 4 decimials between 0 & 1 are present.`}),a}},(e,t,a)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.GalaxyManagementResolver=void 0;const i=a(1),n=a(28);a(23);const o=a(12),s=a(24);let c=class GalaxyManagement{};i.__decorate([(0,o.Field)(),i.__metadata("design:type",String)],c.prototype,"insertedCelestialName",void 0),i.__decorate([(0,o.Field)(),i.__metadata("design:type",String)],c.prototype,"insertedCelestialId",void 0),c=i.__decorate([(0,o.ObjectType)()],c);let _=class GalaxyManagementResolver{async returnNothing(){return null}async createEmpireOriginCelestial(e,t,a){if(!e.id)throw new Error("User id not in token.");if(!(await e.dataSources.hasuraAPI.getGalacticEmpiresByGalaxyId(t)).data.galactic_empire.find((({user_id:t})=>t===e.id)))throw new Error(`Failed to claim celestial, user: ${e.id} has no empire! Something likely went wrong with the creation process.`);const r=(await e.dataSources.hasuraAPI.getGalaxyByIdWithUnclaimedCelestials(t)).data,i=r.celestial.map((e=>e.id)),o=(0,n.getRandomUnclaimedCelestialId)(r.galaxy_by_pk,i),{data:{insert_celestial_one:s}}=await e.dataSources.hasuraAPI.tryInsertClaimedCelestial({celestialId:o,userId:e.id,galaxyId:t,galacticEmpireId:a,celestialName:(0,n.generateCelestialName)()}),_=new c;return _.insertedCelestialId=s.id,_.insertedCelestialName=s.name,_}};i.__decorate([(0,o.Query)((e=>c),{nullable:!0}),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[]),i.__metadata("design:returntype",Promise)],_.prototype,"returnNothing",null),i.__decorate([(0,o.Authorized)("user"),(0,o.Mutation)((e=>c),{nullable:!0}),i.__param(0,(0,o.Ctx)()),i.__param(1,(0,o.Arg)("galaxy_id")),i.__param(2,(0,o.Arg)("galactic_empire_id")),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",["function"==typeof(r=void 0!==s.Context&&s.Context)?r:Object,String,String]),i.__metadata("design:returntype",Promise)],_.prototype,"createEmpireOriginCelestial",null),_=i.__decorate([(0,o.Resolver)((e=>c))],_),t.GalaxyManagementResolver=_},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=a(1);r.__exportStar(a(29),t),r.__exportStar(a(30),t),r.__exportStar(a(31),t)},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.dbGalaxyToGalaxyConfig=void 0;t.dbGalaxyToGalaxyConfig=({arm_width:e,arms:t,core_concentration_factor:a,core_radius_factor:r,curvature:i,id:n,radius:o,stars:s,name:c})=>({seed:n,name:c,radius:o,arms:t,curvature:i,armWidth:e,coreRadiusFactor:r,coreConcentrationFactor:a,stars:s})},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateCelestialName=void 0;const a="ABOUSEITILETSTONLONUTHNO..LEXEGEZACEBISOUSESARMAINDIREA.ERATENBERALAVETIEDORQUANTEISRION",r=e=>{let t=2*(255&e);return t>255&&(t-=255),t},i=e=>e.map((e=>{return 256*r((t=e)/256)+r(255&t);var t})),n=e=>{const t=e.reduce(((e,t)=>e+t),0);return e.map(((e,a,r)=>r[a+1]||65535&t))},o=(e,t)=>{const a=[];let r=[0,0,0,0];const i=64&t[0];return r=r.map((()=>2*((t=n(t))[2]/256&31))),r.forEach(((t,r,n)=>{(i||r<n.length-1)&&(a.push(e[t]),a.push(e[t+1]))})),a.join("").toLowerCase().replace(/^\w/,(e=>e.toUpperCase()))};t.generateCelestialName=()=>(e=>{const t=[];let r=[1e3*Math.random(),100*Math.random(),5e3*Math.random()];const s=a.substring(24);for(let a=0;a<e;++a)t.push(o(s,r)),r=n(i(r));return t})(100)[Math.floor(100*Math.random())]},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getCelestialIdHash=t.getCelestialPosition=t.generateCelestialsWithClaimed=t.getRandomUnclaimedCelestialId=t.generateCelestials=void 0;const r=a(1),i=r.__importDefault(a(32)),n=r.__importDefault(a(33)),o=e=>2*e-1;t.generateCelestials=(e,t)=>{const a=(0,n.default)(t),r=[];for(let n=0;n<e;n++){let e={constants:{arm:a(),theta:a(),rOffset:o(a()),coreRadius:o(a())}};e={...e,hashedConstants:(0,i.default)(e.constants)},r[n]=e}return r};t.getRandomUnclaimedCelestialId=(e,a)=>{const r=(0,t.generateCelestials)(e.stars,e.id).filter((e=>!a.includes(e.hashedConstants)));return r[Math.floor(Math.random()*r.length)].hashedConstants};t.generateCelestialsWithClaimed=(e,t,a)=>{const r=(0,n.default)(t),s=[];for(let n=0;n<e;n++){let e={constants:{arm:r(),theta:r(),rOffset:o(r()),coreRadius:o(r())}};const t=(0,i.default)(e.constants);e={...e,hashedConstants:t,isClaimed:!!a.find((e=>e===t))},s[n]=e}return s};t.getCelestialPosition=(e,t)=>{const a=Math.floor(e.constants.arm*t.arms);let r=Math.pow(e.constants.theta,t.coreConcentrationFactor)*Math.PI*2*t.curvature;const i=Math.pow(e.constants.theta,t.coreConcentrationFactor)*t.radius*(1+e.constants.rOffset*t.armWidth);r+=e.constants.coreRadius*Math.PI*2*t.coreRadiusFactor*(t.radius/i),r+=2*Math.PI/t.arms*a;return{x:Math.cos(r)*i,y:Math.sin(r)*i}};t.getCelestialIdHash=e=>(0,i.default)(e)},e=>{e.exports=require("object-hash")},e=>{e.exports=require("seedrandom")},(e,t,a)=>{var r,i;Object.defineProperty(t,"__esModule",{value:!0}),t.QuestManagementResolver=t.QuestCompletion=t.QuestStepProgression=t.QuestReward=t.QuestManagement=void 0;const n=a(1),o=a(18);a(23);const s=a(12),c=a(24),_=a(20),l=a(35),u=a(37),d=a(38),p=a(36);let m=class QuestManagement{};n.__decorate([(0,s.Field)(),n.__metadata("design:type",String)],m.prototype,"quest_id",void 0),m=n.__decorate([(0,s.ObjectType)()],m),t.QuestManagement=m;let y=class QuestReward{};n.__decorate([(0,s.Field)(),n.__metadata("design:type",String)],y.prototype,"type",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",String)],y.prototype,"npc_unlock_id",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",Number)],y.prototype,"resource_accrual_amount",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",String)],y.prototype,"resource_accrual_type_id",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",String)],y.prototype,"resource_unlock_id",void 0),y=n.__decorate([(0,s.ObjectType)()],y),t.QuestReward=y;let g=class QuestStepProgression{};n.__decorate([(0,s.Field)(),n.__metadata("design:type",String)],g.prototype,"quest_id",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",String)],g.prototype,"next_step_in_quest_added",void 0),g=n.__decorate([(0,s.ObjectType)()],g),t.QuestStepProgression=g;let C=class QuestCompletion{};n.__decorate([(0,s.Field)(),n.__metadata("design:type",String)],C.prototype,"quest_id",void 0),n.__decorate([(0,s.Field)({nullable:!0}),n.__metadata("design:type",String)],C.prototype,"next_quest_in_chain_added",void 0),n.__decorate([(0,s.Field)((()=>[y])),n.__metadata("design:type",Array)],C.prototype,"rewards",void 0),C=n.__decorate([(0,s.ObjectType)()],C),t.QuestCompletion=C;let I=class QuestManagementResolver{async completeQuest({dataSources:e,id:t},a){if(!t)throw new Error(p.QuestErrorTypes.NoUserId);const{data:r}=await e.hasuraQuestProgression.getGalacticEmpireQuestById(a);if(!r||!r.galactic_empire_quest_by_pk)throw new Error(p.QuestErrorTypes.NoQuestToComplete);const i=r.galactic_empire_quest_by_pk.galactic_empire.id;if(!i)throw new Error(p.QuestErrorTypes.NoEmpire);const n=(0,l.questCompletionValidator)({questData:r});if(n.error)throw new Error(n.error);n.resourceModification&&await e.hasuraEmpireResourceModifiers.incrementEmpireResources(n.resourceModification),await e.hasuraQuestProgression.completeQuest(a);const s=new C,c=r.galactic_empire_quest_by_pk.quest.next_quest;c&&(await e.hasuraQuestProgression.addQuest({galactic_empire_id:i,quest_id:c.id,quest_step_id:c.steps[0].id}),s.next_quest_in_chain_added=c.steps[0].id),s.quest_id=a,s.rewards=r.galactic_empire_quest_by_pk.quest.rewards;const u=[];r.galactic_empire_quest_by_pk.quest.rewards.forEach((t=>{switch(t.type){case o.Quest_Reward_Type_Enum.NpcUnlock:u.push(e.hasuraQuestProgression.unlockEmpireNpc(i,t.npc_unlock_id));break;case o.Quest_Reward_Type_Enum.ResourceUnlock:u.push(e.hasuraQuestProgression.unlockEmpireResource(i,t.resource_unlock_id));break;case o.Quest_Reward_Type_Enum.ResourceAccrual:{let a=(0,d.emptyResourceModification)(i);const n=(0,d.validateResourceModification)({resources:r.galactic_empire_quest_by_pk.galactic_empire.resources,resource_amount:t.resource_accrual_amount,resource_id:t.resource_accrual_type_id});if(n.error)throw new Error(n.error);a=(0,_.resourceModificationFactory)(a,n.modifierKey,t.resource_accrual_amount),u.push(e.hasuraEmpireResourceModifiers.incrementEmpireResources(a))}break;default:console.warn(`No reward was processed; unknown type: ${t.type}.`)}}));return(await Promise.all(u)).forEach((({data:e})=>console.log(e))),s}async progressQuestStep({dataSources:e,id:t},a){if(!t)throw new Error(p.QuestErrorTypes.NoUserId);const{data:r}=await e.hasuraQuestProgression.getGalacticEmpireQuestById(a);if(!r||!r.galactic_empire_quest_by_pk)throw new Error(p.QuestErrorTypes.NoQuestToProgress);const i=r.galactic_empire_quest_by_pk.galactic_empire.id;if(!i)throw new Error(p.QuestErrorTypes.NoEmpire);const{galactic_empire_quest_by_pk:{quest_step_id:n,quest:o,galactic_empire:s}}=r,c=o.steps.find((({id:e})=>e===n));if(!c)throw new Error(p.QuestErrorTypes.NoStep);let _=(0,d.emptyResourceModification)(i);const l=(0,u.questStepProgressionValidator)({step:c,galactic_empire:s,resourceModification:_});if(l.error)throw new Error(l.error);l.resourceModification&&(_=l.resourceModification),_=(0,d.nullifyEmptyResourceModification)(_),_&&await e.hasuraEmpireResourceModifiers.incrementEmpireResources(_);const m=null==c?void 0:c.next_step_in_quest;if(!m)throw new Error(p.QuestErrorTypes.NoNextStep);await e.hasuraQuestProgression.progressQuestStep(a,m);const y=new g;return y.quest_id=a,y.next_step_in_quest_added=m,y}};n.__decorate([(0,s.Authorized)("user"),(0,s.Mutation)((e=>C),{nullable:!0}),n.__param(0,(0,s.Ctx)()),n.__param(1,(0,s.Arg)("empire_quest_id")),n.__metadata("design:type",Function),n.__metadata("design:paramtypes",["function"==typeof(r=void 0!==c.Context&&c.Context)?r:Object,String]),n.__metadata("design:returntype",Promise)],I.prototype,"completeQuest",null),n.__decorate([(0,s.Authorized)("user"),(0,s.Mutation)((e=>g),{nullable:!0}),n.__param(0,(0,s.Ctx)()),n.__param(1,(0,s.Arg)("empire_quest_id")),n.__metadata("design:type",Function),n.__metadata("design:paramtypes",["function"==typeof(i=void 0!==c.Context&&c.Context)?i:Object,String]),n.__metadata("design:returntype",Promise)],I.prototype,"progressQuestStep",null),I=n.__decorate([(0,s.Resolver)((e=>m))],I),t.QuestManagementResolver=I},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.questCompletionValidator=void 0;const r=a(36),i=a(37),n=a(38);t.questCompletionValidator=({questData:e})=>{const{galactic_empire_quest_by_pk:{completed:t,quest_step_id:a,quest:o,galactic_empire:s}}=e;if(t)return{error:r.QuestErrorTypes.AlreadyCompleted};const c=o.steps.find((({id:e})=>e===a));if(!c)return{error:r.QuestErrorTypes.NoStep};let _=(0,n.emptyResourceModification)(s.id);const l=(0,i.questStepProgressionValidator)({step:c,galactic_empire:s,resourceModification:_});if(l.error)throw new Error(l.error);return l.resourceModification&&(_=l.resourceModification),_=(0,n.nullifyEmptyResourceModification)(_),{resourceModification:_,resourceUnlockId:undefined,npcUnlockId:undefined}}},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.QuestErrorTypes=void 0,function(e){e.NoUserId="User id not in token",e.NoQuestToComplete="No quest to complete.",e.NoQuestToProgress="No quest to progress.",e.NoEmpire="No galactic empire found.",e.AlreadyCompleted="Quest already completed",e.NoStep="No quest step found.",e.NoNextStep="No next step in quest.",e.NoResourcesUnlocked="This empire has not yet unlocked any resources.",e.ResourceNotUnlocked="This empire has not yet unlocked the specified resource you tried to modify.",e.NotEnoughResources="You don't have enough resources to spend!",e.InvalidResourceType="Resource type is not valid."}(t.QuestErrorTypes||(t.QuestErrorTypes={}))},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.questStepProgressionValidator=void 0;const r=a(36),i=a(18),n=a(20),o=a(38);t.questStepProgressionValidator=({step:e,galactic_empire:t,resourceModification:a})=>{switch(e.type){case i.Quest_Step_Type_Enum.Cta:case i.Quest_Step_Type_Enum.NpcContact:break;case i.Quest_Step_Type_Enum.ResourceCost:{if(!t.resources.length)return{error:r.QuestErrorTypes.NoResourcesUnlocked};const i=(0,o.validateResourceModification)({resources:t.resources,resource_amount:-e.resource_cost_amount,resource_id:e.resource_cost_id});if(i.error)return{error:i.error};i.modifierKey&&(a=(0,n.resourceModificationFactory)(a,i.modifierKey,-e.resource_cost_amount))}}return{resourceModification:a=(0,o.nullifyEmptyResourceModification)(a)}}},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateResourceModification=t.nullifyEmptyResourceModification=t.emptyResourceModification=void 0;const r=a(36);t.emptyResourceModification=e=>({galacticEmpireId:e,commonMetalsIncrement:0,galacticCreditsIncrement:0,hydrocarbonsIncrement:0,rareMetalsIncrement:0,voidMatterIncrement:0});t.nullifyEmptyResourceModification=({commonMetalsIncrement:e,galacticCreditsIncrement:t,hydrocarbonsIncrement:a,rareMetalsIncrement:r,voidMatterIncrement:i,...n})=>{if(0!==e||0!==t||0!==a||0!==r||0!==i)return{commonMetalsIncrement:e,galacticCreditsIncrement:t,hydrocarbonsIncrement:a,rareMetalsIncrement:r,voidMatterIncrement:i,...n}};t.validateResourceModification=({resources:e,resource_amount:t,resource_id:a})=>{const i=e.find((({resource_type:{id:e}})=>e===a));if(!i)return{error:r.QuestErrorTypes.ResourceNotUnlocked};if(t<0&&-t>i.value)return{error:r.QuestErrorTypes.NotEnoughResources};let n;switch(i.resource_type.type){case"galactic credits":n="galacticCreditsIncrement";break;case"common metals":n="commonMetalsIncrement";break;case"hydrocarbons":n="hydrocarbonsIncrement";break;case"rare metals":n="rareMetalsIncrement";break;case"void matter":n="voidMatterIncrement";break;default:return{error:r.QuestErrorTypes.InvalidResourceType}}return{modifierKey:n}}},(e,t,a)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.RegisterResolver=void 0;const i=a(1),n=a(12),o=a(24);let s=class Register{};i.__decorate([(0,n.Field)(),i.__metadata("design:type",String)],s.prototype,"updatedName",void 0),s=i.__decorate([(0,n.ObjectType)()],s);let c=class RegisterResolver{async setDisplayName(e,t){if(!e.id)throw new Error("User id not in token");const a=(await e.dataSources.hasuraAPI.trySetDisplayName(e.id,t)).data.update_user_info_by_pk.display_name;if(a){await e.dataSources.auth0API.trySetUserRole(e.id,"rol_10vO6MmzARbpP2nL"),console.log(a);const t=new s;return t.updatedName=a,t}throw new Error("Failed to insert display name")}};i.__decorate([(0,n.Mutation)((e=>s),{nullable:!0}),i.__param(0,(0,n.Ctx)()),i.__param(1,(0,n.Arg)("display_name")),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",["function"==typeof(r=void 0!==o.Context&&o.Context)?r:Object,String]),i.__metadata("design:returntype",Promise)],c.prototype,"setDisplayName",null),c=i.__decorate([(0,n.Resolver)((e=>s))],c),t.RegisterResolver=c},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.automaticMainQuestAssignment=void 0;const r=a(18);t.automaticMainQuestAssignment=async(e,{addQuest:t})=>{const a=(await e.query({query:r.InitialMainQuestIdDocument})).data.quest[0];if(!a)throw new Error("No initial main quest found!");return e.subscribe({query:r.EmpiresWithoutQuestsDocument}).subscribe({next:({data:{galactic_empire_aggregate:e}})=>{e.nodes.forEach((({id:e})=>t({galactic_empire_id:e,quest_id:a.id,quest_step_id:a.steps[0].id}).then((e=>console.log("Initial main quest added:",e.data.insert_galactic_empire_quest_one)))))}})}},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateResources=t.generationRate=void 0;const r=a(18);t.generationRate=1e3;t.generateResources=e=>{console.log(`Beginning resource generation at 1 tick every ${t.generationRate/1e3} seconds.`);let a=[],i=[];e.subscribe({query:r.ResourceGeneratorsDocument}).subscribe({next:({data:{galactic_empire_resource_generator:e}})=>{const t=[];a=[...new Set(e.map((({galactic_empire_id:e})=>e)))],a.forEach((a=>{let r=0,i=0,n=0,o=0,s=0;const c=(e,t)=>{switch(e){case"galactic credits":r+=t;break;case"common metals":i+=t;break;case"rare metals":n+=t;break;case"hydrocarbons":o+=t;break;case"void matter":s+=t}};e.filter((({galactic_empire_id:e})=>e===a)).forEach((e=>{var t;if(null===(t=e.resource_generator_type)||void 0===t?void 0:t.resource_type_2){const[t,a]=e.resource_generator_type.generation_rate;c(e.resource_generator_type.resource_type.type,t),c(e.resource_generator_type.resource_type_2.type,a)}else{const[t]=e.resource_generator_type.generation_rate;c(e.resource_generator_type.resource_type.type,t)}})),t.push({galacticEmpireId:a,galacticCreditsIncrement:r,commonMetalsIncrement:i,rareMetalsIncrement:n,hydrocarbonsIncrement:o,voidMatterIncrement:s})})),i=t}}),setInterval((()=>{const t=[];i.forEach((({galacticEmpireId:a,galacticCreditsIncrement:i,commonMetalsIncrement:n,rareMetalsIncrement:o,hydrocarbonsIncrement:s,voidMatterIncrement:c})=>t.push(e.mutate({mutation:r.IncrementGalacticEmpireResourcesDocument,variables:{galacticEmpireId:a,galacticCreditsIncrement:i,commonMetalsIncrement:n,hydrocarbonsIncrement:s,rareMetalsIncrement:o,voidMatterIncrement:c}})))),Promise.all(t).then((e=>{e.length&&console.log(`Resources generated for ${e.length} empires at ${(new Date).toLocaleTimeString()}`)}))}),t.generationRate)}},e=>{e.exports=require("ws")}],t={};function a(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0});const t=a(1),i=a(2),n=a(7),o=t.__importDefault(a(8)),s=t.__importDefault(a(9)),c=t.__importDefault(a(10)),_=t.__importDefault(a(11)),l=a(12),u=a(13),d=a(14),p=a(17),m=a(20),y=a(21),g=a(22),C=a(27),I=a(34),h=a(39),f=a(40),E=a(41),S=a(42);(async()=>{const e=(0,i.apolloBootstrapper)(process.env.HASURA_URI,"secure"===process.env.SECURE_HASURA,"admin-secret",(()=>process.env.HASURA_ADMIN_SECRET),{typePolicies:{Subscription:{fields:{galactic_empire_resource_generator:{merge:(e,t)=>({...t})}}}}},o.default,S,{query:{fetchPolicy:"no-cache"},mutate:{fetchPolicy:"no-cache"}}),t=await(0,l.buildSchema)({resolvers:[h.RegisterResolver,C.GalaxyManagementResolver,g.CelestialManagementResolver,I.QuestManagementResolver],authChecker:u.authChecker,emitSchemaFile:!0}),a=(0,s.default)(),r="/graphql",R=new n.ApolloServer({schema:t,context:({req:e})=>{const t={req:e,user:e.user};return e.user&&t.req.user[process.env.HASURA_NAMESPACE]&&(t.req.user[process.env.HASURA_NAMESPACE]["x-hasura-allowed-roles"]&&(t.roles=t.req.user[process.env.HASURA_NAMESPACE]["x-hasura-allowed-roles"]),t.req.user[process.env.HASURA_NAMESPACE]["x-hasura-user-id"]&&(t.id=t.req.user[process.env.HASURA_NAMESPACE]["x-hasura-user-id"])),t},dataSources:()=>({hasuraAPI:new p.HasuraAPI(e),hasuraQuestProgression:new y.HasuraQuestProgression(e),hasuraEmpireResourceModifiers:new m.HasuraEmpireResourceModifiers(e),auth0API:new d.Auth0API}),introspection:!0});a.use(r,(0,c.default)({credentialsRequired:!1,secret:_.default.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`}),audience:process.env.AUTH0_CLIENT_ID,issuer:[`https://${process.env.AUTH0_DOMAIN}/`],algorithms:["RS256"]})),await R.start(),(0,E.generateResources)(e),(0,f.automaticMainQuestAssignment)(e,new y.HasuraQuestProgression(e)),R.applyMiddleware({app:a,path:r}),a.listen({port:process.env.PORT||4e3},(()=>console.log(`\ud83d\ude80 Idleverse Game Server ready at http://localhost:${process.env.PORT||4e3}${R.graphqlPath}`)))})()})();var i=exports;for(var n in r)i[n]=r[n];r.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();