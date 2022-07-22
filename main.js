(()=>{"use strict";var __webpack_modules__={409:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.authChecker=void 0;exports.authChecker=async({context},roles)=>{if(0===roles.length)return!0;if(!(null==context?void 0:context.roles))throw console.warn("No roles present in JWT."),new Error("ACCESS DENIED: You have no roles.");const idTokenRoles=context.roles;for(const role of roles)if(!idTokenRoles.includes(role))throw new Error(`ACCESS DENIED: You need to have role: ${role} for this action.`);return!0}},712:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.Auth0API=void 0;const tslib_1=__webpack_require__(752),apollo_datasource_1=__webpack_require__(297),axios_1=tslib_1.__importDefault(__webpack_require__(167));class Auth0API extends apollo_datasource_1.DataSource{constructor(){super(...arguments),this.trySetUserRole=async(id,role)=>this.post(`/users/${id}/roles`,{roles:[role]})}async getManagementToken(){const options={method:"POST",url:`https://${process.env.AUTH0_DOMAIN}/oauth/token/`,headers:{"content-type":"application/json"},data:{grant_type:"client_credentials",client_id:process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,client_secret:process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,audience:`https://${process.env.AUTH0_DOMAIN}/api/v2/`}};return axios_1.default.request(options)}async post(path,requestOptions){const{data:{access_token}}=await this.getManagementToken(),options={method:"POST",url:`https://${process.env.AUTH0_DOMAIN}/api/v2`+path,headers:{"content-type":"application/json",authorization:`Bearer ${access_token}`,"cache-control":"no-cache"},data:requestOptions};return axios_1.default.request(options)}}exports.Auth0API=Auth0API},98:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},760:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.HasuraAPI=void 0;const galaxy_gql_1=__webpack_require__(907),apollo_datasource_1=__webpack_require__(297);class HasuraAPI extends apollo_datasource_1.DataSource{constructor(client){super(),this.trySetDisplayName=async(id,display_name)=>this.client.mutate({mutation:galaxy_gql_1.SetDisplayNameByUserIdDocument,variables:{id,display_name}}),this.getGalacticEmpiresByGalaxyId=async galaxyId=>this.client.query({query:galaxy_gql_1.GalacticEmpiresByGalaxyIdDocument,variables:{galaxyId}}),this.getGalaxyByIdWithUnclaimedCelestials=async galaxyId=>this.client.query({query:galaxy_gql_1.GetGalaxyByIdAndUnclaimedCelestialsDocument,variables:{galaxyId}}),this.tryInsertClaimedCelestial=async(userId,celestialId,galaxyId,celestialName)=>this.client.mutate({mutation:galaxy_gql_1.TryInsertClaimedCelestialDocument,variables:{id:celestialId,owner_id:userId,name:celestialName,galaxy_id:galaxyId}}),this.tryInsertPlanetToCelestial=async variables=>this.client.mutate({mutation:galaxy_gql_1.TryInsertPlanetDocument,variables}),this.client=client}}exports.HasuraAPI=HasuraAPI},659:(__unused_webpack_module,exports,__webpack_require__)=>{var _a,_b,_c;Object.defineProperty(exports,"__esModule",{value:!0}),exports.CelestialManagementResolver=void 0;const tslib_1=__webpack_require__(752);__webpack_require__(236);const type_graphql_1=__webpack_require__(345),context_1=__webpack_require__(98),celestial_types_1=__webpack_require__(546),planet_validator_1=__webpack_require__(728);let CelestialManagementResolver=class CelestialManagementResolver{async createPlanet(context,input){var _a,_b;if(!context.id)throw new Error("User id not in token");const validationIssues=(0,planet_validator_1.planetValidator)(input);if(validationIssues.length)throw new Error(`Planet input validation failed. ${validationIssues.map((({issue},i)=>`\n${i+1}. ${issue}`))}`);const rings={...null==input?void 0:input.rings};(null===(_b=null===(_a=null==input?void 0:input.rings)||void 0===_a?void 0:_a.data)||void 0===_b?void 0:_b.length)&&(rings.data=input.rings.data.map((({terrain_bias,rotation,colors,...rest})=>({...rest,colors:`{${colors}}`,terrain_bias:`{${terrain_bias}}`,rotation:`{${rotation}}`}))));const data=(await context.dataSources.hasuraAPI.tryInsertPlanetToCelestial({input:{...input,terrain_bias:`{${input.terrain_bias}}`,rings}})).data,planet=null==data?void 0:data.insert_planet_one;if(!planet)throw new Error("Failed to insert planet");const celestialManagement=new celestial_types_1.CelestialManagement;return celestialManagement.createdPlanet=planet,celestialManagement}};tslib_1.__decorate([(0,type_graphql_1.Authorized)("user"),(0,type_graphql_1.Mutation)((returns=>celestial_types_1.CelestialManagement),{nullable:!0}),tslib_1.__param(0,(0,type_graphql_1.Ctx)()),tslib_1.__param(1,(0,type_graphql_1.Arg)("input")),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",["function"==typeof(_a=void 0!==context_1.Context&&context_1.Context)?_a:Object,"function"==typeof(_b=void 0!==celestial_types_1.PlanetCreationInput&&celestial_types_1.PlanetCreationInput)?_b:Object]),tslib_1.__metadata("design:returntype","function"==typeof(_c="undefined"!=typeof Promise&&Promise)?_c:Object)],CelestialManagementResolver.prototype,"createPlanet",null),CelestialManagementResolver=tslib_1.__decorate([(0,type_graphql_1.Resolver)((of=>celestial_types_1.CelestialManagement))],CelestialManagementResolver),exports.CelestialManagementResolver=CelestialManagementResolver},546:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.CelestialManagement=exports.PartialPlanet=exports.PlanetCreationInput=exports.RingInsertInputWrapper=exports.RingInsertInput=void 0;const tslib_1=__webpack_require__(752),type_graphql_1=__webpack_require__(345);let RingInsertInput=class RingInsertInput{};tslib_1.__decorate([(0,type_graphql_1.Field)((type=>[String])),tslib_1.__metadata("design:type",Array)],RingInsertInput.prototype,"colors",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],RingInsertInput.prototype,"inner_radius",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],RingInsertInput.prototype,"outer_radius",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],RingInsertInput.prototype,"resolution",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)((type=>[type_graphql_1.Float])),tslib_1.__metadata("design:type",Array)],RingInsertInput.prototype,"rotation",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)((type=>[type_graphql_1.Float])),tslib_1.__metadata("design:type",Array)],RingInsertInput.prototype,"terrain_bias",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],RingInsertInput.prototype,"type",void 0),RingInsertInput=tslib_1.__decorate([(0,type_graphql_1.InputType)()],RingInsertInput),exports.RingInsertInput=RingInsertInput;let RingInsertInputWrapper=class RingInsertInputWrapper{};tslib_1.__decorate([(0,type_graphql_1.Field)((()=>[RingInsertInput])),tslib_1.__metadata("design:type",Array)],RingInsertInputWrapper.prototype,"data",void 0),RingInsertInputWrapper=tslib_1.__decorate([(0,type_graphql_1.InputType)()],RingInsertInputWrapper),exports.RingInsertInputWrapper=RingInsertInputWrapper;let PlanetCreationInput=class PlanetCreationInput{};tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PlanetCreationInput.prototype,"celestial_id",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PlanetCreationInput.prototype,"id",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PlanetCreationInput.prototype,"name",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PlanetCreationInput.prototype,"owner_id",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],PlanetCreationInput.prototype,"radius",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)((()=>RingInsertInputWrapper)),tslib_1.__metadata("design:type",RingInsertInputWrapper)],PlanetCreationInput.prototype,"rings",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)((type=>[type_graphql_1.Float])),tslib_1.__metadata("design:type",Array)],PlanetCreationInput.prototype,"terrain_bias",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PlanetCreationInput.prototype,"terrain_hex_palette_id",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],PlanetCreationInput.prototype,"texture_resolution",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",Number)],PlanetCreationInput.prototype,"atmospheric_distance",void 0),PlanetCreationInput=tslib_1.__decorate([(0,type_graphql_1.InputType)()],PlanetCreationInput),exports.PlanetCreationInput=PlanetCreationInput;let PartialPlanet=class PartialPlanet{};tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PartialPlanet.prototype,"id",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PartialPlanet.prototype,"name",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],PartialPlanet.prototype,"owner_id",void 0),PartialPlanet=tslib_1.__decorate([(0,type_graphql_1.ObjectType)()],PartialPlanet),exports.PartialPlanet=PartialPlanet;let CelestialManagement=class CelestialManagement{};tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",PartialPlanet)],CelestialManagement.prototype,"createdPlanet",void 0),CelestialManagement=tslib_1.__decorate([(0,type_graphql_1.ObjectType)()],CelestialManagement),exports.CelestialManagement=CelestialManagement},839:(__unused_webpack_module,exports,__webpack_require__)=>{var _a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.GalaxyManagementResolver=void 0;const tslib_1=__webpack_require__(752),galaxy_gen_1=__webpack_require__(776);__webpack_require__(236);const type_graphql_1=__webpack_require__(345),context_1=__webpack_require__(98);let GalaxyManagement=class GalaxyManagement{};tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],GalaxyManagement.prototype,"insertedCelestialName",void 0),tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],GalaxyManagement.prototype,"insertedCelestialId",void 0),GalaxyManagement=tslib_1.__decorate([(0,type_graphql_1.ObjectType)()],GalaxyManagement);let GalaxyManagementResolver=class GalaxyManagementResolver{async returnNothing(){return null}async createEmpireOriginCelestial(context,galaxyId){if(!context.id)throw new Error("User id not in token.");if((await context.dataSources.hasuraAPI.getGalacticEmpiresByGalaxyId(galaxyId)).data.galactic_empire.find((({user_id})=>user_id===context.id)))throw new Error("This user has an existing empire in this galaxy.");const data=(await context.dataSources.hasuraAPI.getGalaxyByIdWithUnclaimedCelestials(galaxyId)).data,claimedCelestials=data.celestial.map((celestial=>celestial.id)),randomCelestialId=(0,galaxy_gen_1.getRandomUnclaimedCelestialId)(data.galaxy_by_pk,claimedCelestials),{data:{insert_celestial_one}}=await context.dataSources.hasuraAPI.tryInsertClaimedCelestial(context.id,randomCelestialId,galaxyId,(0,galaxy_gen_1.generateCelestialName)()),temp=new GalaxyManagement;return temp.insertedCelestialId=insert_celestial_one.id,temp.insertedCelestialName=insert_celestial_one.name,temp}};tslib_1.__decorate([(0,type_graphql_1.Query)((returns=>GalaxyManagement),{nullable:!0}),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[]),tslib_1.__metadata("design:returntype",Promise)],GalaxyManagementResolver.prototype,"returnNothing",null),tslib_1.__decorate([(0,type_graphql_1.Authorized)("user"),(0,type_graphql_1.Mutation)((returns=>GalaxyManagement),{nullable:!0}),tslib_1.__param(0,(0,type_graphql_1.Ctx)()),tslib_1.__param(1,(0,type_graphql_1.Arg)("galaxy_id")),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",["function"==typeof(_a=void 0!==context_1.Context&&context_1.Context)?_a:Object,String]),tslib_1.__metadata("design:returntype",Promise)],GalaxyManagementResolver.prototype,"createEmpireOriginCelestial",null),GalaxyManagementResolver=tslib_1.__decorate([(0,type_graphql_1.Resolver)((of=>GalaxyManagement))],GalaxyManagementResolver),exports.GalaxyManagementResolver=GalaxyManagementResolver},728:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.planetValidator=void 0;exports.planetValidator=({texture_resolution,terrain_bias})=>{const issues=[];return texture_resolution<64&&issues.push({field:"texture_resolution",issue:`TEXTURE RESOLUTION: ${texture_resolution} is below the minimum of 64.`}),(4!==terrain_bias.length||terrain_bias.some((x=>x>1)))&&issues.push({field:"terrain_bias",issue:`TERRAIN BIAS: invalid value of [${terrain_bias}] detected. Ensure that exactly 4 decimials between 0 & 1 are present.`}),issues}},545:(__unused_webpack_module,exports,__webpack_require__)=>{var _a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.RegisterResolver=void 0;const tslib_1=__webpack_require__(752),type_graphql_1=__webpack_require__(345),context_1=__webpack_require__(98);let Register=class Register{};tslib_1.__decorate([(0,type_graphql_1.Field)(),tslib_1.__metadata("design:type",String)],Register.prototype,"updatedName",void 0),Register=tslib_1.__decorate([(0,type_graphql_1.ObjectType)()],Register);let RegisterResolver=class RegisterResolver{async setDisplayName(context,displayName){if(!context.id)throw new Error("User id not in token");const resDisplayName=(await context.dataSources.hasuraAPI.trySetDisplayName(context.id,displayName)).data.update_user_info_by_pk.display_name;if(resDisplayName){await context.dataSources.auth0API.trySetUserRole(context.id,"rol_10vO6MmzARbpP2nL"),console.log(resDisplayName);const register=new Register;return register.updatedName=resDisplayName,register}throw new Error("Failed to insert display name")}};tslib_1.__decorate([(0,type_graphql_1.Mutation)((returns=>Register),{nullable:!0}),tslib_1.__param(0,(0,type_graphql_1.Ctx)()),tslib_1.__param(1,(0,type_graphql_1.Arg)("display_name")),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",["function"==typeof(_a=void 0!==context_1.Context&&context_1.Context)?_a:Object,String]),tslib_1.__metadata("design:returntype",Promise)],RegisterResolver.prototype,"setDisplayName",null),RegisterResolver=tslib_1.__decorate([(0,type_graphql_1.Resolver)((of=>Register))],RegisterResolver),exports.RegisterResolver=RegisterResolver},776:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=__webpack_require__(752);tslib_1.__exportStar(__webpack_require__(461),exports),tslib_1.__exportStar(__webpack_require__(158),exports),tslib_1.__exportStar(__webpack_require__(191),exports)},461:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.dbGalaxyToGalaxyConfig=void 0;exports.dbGalaxyToGalaxyConfig=({arm_width,arms,core_concentration_factor,core_radius_factor,curvature,id,radius,stars,name})=>({seed:id,name,radius,arms,curvature,armWidth:arm_width,coreRadiusFactor:core_radius_factor,coreConcentrationFactor:core_concentration_factor,stars})},158:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateCelestialName=void 0;const digrams="ABOUSEITILETSTONLONUTHNO..LEXEGEZACEBISOUSESARMAINDIREA.ERATENBERALAVETIEDORQUANTEISRION",rotatel=x=>{let tmp=2*(255&x);return tmp>255&&(tmp-=255),tmp},next=seeds=>seeds.map((seed=>{return 256*rotatel((x=seed)/256)+rotatel(255&x);var x})),tweakseed=seeds=>{const tmp=seeds.reduce(((total,seed)=>total+seed),0);return seeds.map(((seed,index,arr)=>arr[index+1]||65535&tmp))},makename=(pairs,seeds)=>{const name=[];let pair=[0,0,0,0];const longname=64&seeds[0];return pair=pair.map((()=>2*((seeds=tweakseed(seeds))[2]/256&31))),pair.forEach(((value,index,arr)=>{(longname||index<arr.length-1)&&(name.push(pairs[value]),name.push(pairs[value+1]))})),name.join("").toLowerCase().replace(/^\w/,(letter=>letter.toUpperCase()))};exports.generateCelestialName=()=>(amount=>{const names=[];let seeds=[1e3*Math.random(),100*Math.random(),5e3*Math.random()];const pairs=digrams.substring(24);for(let i=0;i<amount;++i)names.push(makename(pairs,seeds)),seeds=tweakseed(next(seeds));return names})(100)[Math.floor(100*Math.random())]},191:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCelestialIdHash=exports.getCelestialPosition=exports.generateCelestialsWithClaimed=exports.getRandomUnclaimedCelestialId=exports.generateCelestials=void 0;const tslib_1=__webpack_require__(752),object_hash_1=tslib_1.__importDefault(__webpack_require__(569)),seedrandom_1=tslib_1.__importDefault(__webpack_require__(621)),signedRandom=number=>2*number-1;exports.generateCelestials=(count,seed)=>{const pseudoRandomGenerator=(0,seedrandom_1.default)(seed),celestials=[];for(let i=0;i<count;i++){let celestial={constants:{arm:pseudoRandomGenerator(),theta:pseudoRandomGenerator(),rOffset:signedRandom(pseudoRandomGenerator()),coreRadius:signedRandom(pseudoRandomGenerator())}};celestial={...celestial,hashedConstants:(0,object_hash_1.default)(celestial.constants)},celestials[i]=celestial}return celestials};exports.getRandomUnclaimedCelestialId=(galaxyConfig,claimedCelestialsId)=>{const filteredCelestials=(0,exports.generateCelestials)(galaxyConfig.stars,galaxyConfig.id).filter((celestial=>!claimedCelestialsId.includes(celestial.hashedConstants)));return filteredCelestials[Math.floor(Math.random()*filteredCelestials.length)].hashedConstants};exports.generateCelestialsWithClaimed=(count,seed,claimedCelestials)=>{const pseudoRandomGenerator=(0,seedrandom_1.default)(seed),celestials=[];for(let i=0;i<count;i++){let celestial={constants:{arm:pseudoRandomGenerator(),theta:pseudoRandomGenerator(),rOffset:signedRandom(pseudoRandomGenerator()),coreRadius:signedRandom(pseudoRandomGenerator())}};const hashedConstants=(0,object_hash_1.default)(celestial.constants);celestial={...celestial,hashedConstants,isClaimed:!!claimedCelestials.find((cc=>cc===hashedConstants))},celestials[i]=celestial}return celestials};exports.getCelestialPosition=(cel,config)=>{const arm=Math.floor(cel.constants.arm*config.arms);let theta=Math.pow(cel.constants.theta,config.coreConcentrationFactor)*Math.PI*2*config.curvature;const r=Math.pow(cel.constants.theta,config.coreConcentrationFactor)*config.radius*(1+cel.constants.rOffset*config.armWidth);theta+=cel.constants.coreRadius*Math.PI*2*config.coreRadiusFactor*(config.radius/r),theta+=2*Math.PI/config.arms*arm;return{x:Math.cos(theta)*r,y:Math.sin(theta)*r}};exports.getCelestialIdHash=constants=>(0,object_hash_1.default)(constants)},907:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});__webpack_require__(752).__exportStar(__webpack_require__(582),exports)},582:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GalacticEmpiresByGalaxyIdDocument=exports.GalacticEmpireByIdDocument=exports.CreateGalacticEmpireDocument=exports.SendNewMessageDocument=exports.LatestMessageDocument=exports.GetChatMessagesDocument=exports.CharacterDataDocument=exports.TryInsertClaimedCelestialDocument=exports.CreateEmpireOriginCelestialDocument=exports.CelestialsByGalaxyIdDocument=exports.CelestialsDocument=exports.CelestialByIdDocument=exports.GalaxyFieldsFragmentDoc=exports.CelestialFieldsFragmentDoc=exports.User_Private_Select_Column=exports.User_Me_Select_Column=exports.User_Info_Update_Column=exports.User_Info_Select_Column=exports.User_Info_Constraint=exports.Terrain_Hex_Palette_Update_Column=exports.Terrain_Hex_Palette_Select_Column=exports.Terrain_Hex_Palette_Constraint=exports.Playable_Race_Update_Column=exports.Playable_Race_Select_Column=exports.Playable_Race_Constraint=exports.Planetary_Ring_Update_Column=exports.Planetary_Ring_Select_Column=exports.Planetary_Ring_Constraint=exports.Planet_Update_Column=exports.Planet_Select_Column=exports.Planet_Constraint=exports.Order_By=exports.Galaxy_Update_Column=exports.Galaxy_Select_Column=exports.Galaxy_Constraint=exports.Galactic_Empire_Update_Column=exports.Galactic_Empire_Select_Column=exports.Galactic_Empire_Constraint=exports.Faction_Update_Column=exports.Faction_Select_Column=exports.Faction_Constraint=exports.Chat_Message_Update_Column=exports.Chat_Message_Select_Column=exports.Chat_Message_Constraint=exports.Celestial_Update_Column=exports.Celestial_Select_Column=exports.Celestial_Constraint=exports.Background_Update_Column=exports.Background_Select_Column=exports.Background_Constraint=void 0,exports.UserInfoDocument=exports.SetNameByUserIdDocument=exports.SetDisplayNameByUserIdDocument=exports.SelfDocument=exports.TryInsertPlanetDocument=exports.TerrainHexPalettesDocument=exports.PlanetsByCelestialIdDocument=exports.PlanetByIdDocument=exports.CreatePlanetDocument=exports.GetGalaxyByIdAndUnclaimedCelestialsDocument=exports.OngoingGalaxySessionsDocument=exports.GalaxyByIdDocument=exports.GalaxiesWithOwnedCelestialsDocument=exports.GalaxiesDocument=exports.DeleteGalaxyByIdDocument=exports.CreateGalaxyDocument=void 0;const client_1=__webpack_require__(114);!function(Background_Constraint){Background_Constraint.BackgroundNameKey="background_name_key",Background_Constraint.BackgroundPkey="background_pkey"}(exports.Background_Constraint||(exports.Background_Constraint={})),function(Background_Select_Column){Background_Select_Column.Description="description",Background_Select_Column.Id="id",Background_Select_Column.Name="name"}(exports.Background_Select_Column||(exports.Background_Select_Column={})),function(Background_Update_Column){Background_Update_Column.Description="description",Background_Update_Column.Id="id",Background_Update_Column.Name="name"}(exports.Background_Update_Column||(exports.Background_Update_Column={})),function(Celestial_Constraint){Celestial_Constraint.SystemPkey="system_pkey"}(exports.Celestial_Constraint||(exports.Celestial_Constraint={})),function(Celestial_Select_Column){Celestial_Select_Column.GalacticEmpireId="galactic_empire_id",Celestial_Select_Column.GalaxyId="galaxy_id",Celestial_Select_Column.Id="id",Celestial_Select_Column.Name="name",Celestial_Select_Column.OwnerId="owner_id"}(exports.Celestial_Select_Column||(exports.Celestial_Select_Column={})),function(Celestial_Update_Column){Celestial_Update_Column.GalacticEmpireId="galactic_empire_id",Celestial_Update_Column.GalaxyId="galaxy_id",Celestial_Update_Column.Id="id",Celestial_Update_Column.Name="name",Celestial_Update_Column.OwnerId="owner_id"}(exports.Celestial_Update_Column||(exports.Celestial_Update_Column={})),function(Chat_Message_Constraint){Chat_Message_Constraint.ChatMessagesPkey="chat_messages_pkey"}(exports.Chat_Message_Constraint||(exports.Chat_Message_Constraint={})),function(Chat_Message_Select_Column){Chat_Message_Select_Column.Id="id",Chat_Message_Select_Column.Message="message",Chat_Message_Select_Column.PosterId="poster_id",Chat_Message_Select_Column.Timestamp="timestamp"}(exports.Chat_Message_Select_Column||(exports.Chat_Message_Select_Column={})),function(Chat_Message_Update_Column){Chat_Message_Update_Column.Id="id",Chat_Message_Update_Column.Message="message",Chat_Message_Update_Column.PosterId="poster_id",Chat_Message_Update_Column.Timestamp="timestamp"}(exports.Chat_Message_Update_Column||(exports.Chat_Message_Update_Column={})),function(Faction_Constraint){Faction_Constraint.FactionNameKey="faction_name_key",Faction_Constraint.FactionPkey="faction_pkey"}(exports.Faction_Constraint||(exports.Faction_Constraint={})),function(Faction_Select_Column){Faction_Select_Column.Description="description",Faction_Select_Column.Id="id",Faction_Select_Column.Name="name"}(exports.Faction_Select_Column||(exports.Faction_Select_Column={})),function(Faction_Update_Column){Faction_Update_Column.Description="description",Faction_Update_Column.Id="id",Faction_Update_Column.Name="name"}(exports.Faction_Update_Column||(exports.Faction_Update_Column={})),function(Galactic_Empire_Constraint){Galactic_Empire_Constraint.GalacticEmpirePkey="galactic_empire_pkey",Galactic_Empire_Constraint.GalacticEmpireUserIdGalaxyIdKey="galactic_empire_user_id_galaxy_id_key"}(exports.Galactic_Empire_Constraint||(exports.Galactic_Empire_Constraint={})),function(Galactic_Empire_Select_Column){Galactic_Empire_Select_Column.BackgroundId="background_id",Galactic_Empire_Select_Column.CelestialClaims="celestial_claims",Galactic_Empire_Select_Column.FactionId="faction_id",Galactic_Empire_Select_Column.GalaxyId="galaxy_id",Galactic_Empire_Select_Column.HomeworldId="homeworld_id",Galactic_Empire_Select_Column.Id="id",Galactic_Empire_Select_Column.PlayableRaceId="playable_race_id",Galactic_Empire_Select_Column.UserId="user_id"}(exports.Galactic_Empire_Select_Column||(exports.Galactic_Empire_Select_Column={})),function(Galactic_Empire_Update_Column){Galactic_Empire_Update_Column.BackgroundId="background_id",Galactic_Empire_Update_Column.CelestialClaims="celestial_claims",Galactic_Empire_Update_Column.FactionId="faction_id",Galactic_Empire_Update_Column.GalaxyId="galaxy_id",Galactic_Empire_Update_Column.HomeworldId="homeworld_id",Galactic_Empire_Update_Column.Id="id",Galactic_Empire_Update_Column.PlayableRaceId="playable_race_id",Galactic_Empire_Update_Column.UserId="user_id"}(exports.Galactic_Empire_Update_Column||(exports.Galactic_Empire_Update_Column={})),function(Galaxy_Constraint){Galaxy_Constraint.GalaxyPkey="galaxy_pkey"}(exports.Galaxy_Constraint||(exports.Galaxy_Constraint={})),function(Galaxy_Select_Column){Galaxy_Select_Column.ArmWidth="arm_width",Galaxy_Select_Column.Arms="arms",Galaxy_Select_Column.CoreConcentrationFactor="core_concentration_factor",Galaxy_Select_Column.CoreRadiusFactor="core_radius_factor",Galaxy_Select_Column.Curvature="curvature",Galaxy_Select_Column.Id="id",Galaxy_Select_Column.Name="name",Galaxy_Select_Column.Radius="radius",Galaxy_Select_Column.Stars="stars"}(exports.Galaxy_Select_Column||(exports.Galaxy_Select_Column={})),function(Galaxy_Update_Column){Galaxy_Update_Column.ArmWidth="arm_width",Galaxy_Update_Column.Arms="arms",Galaxy_Update_Column.CoreConcentrationFactor="core_concentration_factor",Galaxy_Update_Column.CoreRadiusFactor="core_radius_factor",Galaxy_Update_Column.Curvature="curvature",Galaxy_Update_Column.Id="id",Galaxy_Update_Column.Name="name",Galaxy_Update_Column.Radius="radius",Galaxy_Update_Column.Stars="stars"}(exports.Galaxy_Update_Column||(exports.Galaxy_Update_Column={})),function(Order_By){Order_By.Asc="asc",Order_By.AscNullsFirst="asc_nulls_first",Order_By.AscNullsLast="asc_nulls_last",Order_By.Desc="desc",Order_By.DescNullsFirst="desc_nulls_first",Order_By.DescNullsLast="desc_nulls_last"}(exports.Order_By||(exports.Order_By={})),function(Planet_Constraint){Planet_Constraint.PlanetNameKey="planet_name_key",Planet_Constraint.PlanetPkey="planet_pkey"}(exports.Planet_Constraint||(exports.Planet_Constraint={})),function(Planet_Select_Column){Planet_Select_Column.AtmosphericDistance="atmospheric_distance",Planet_Select_Column.CelestialId="celestial_id",Planet_Select_Column.Id="id",Planet_Select_Column.Name="name",Planet_Select_Column.OwnerId="owner_id",Planet_Select_Column.Radius="radius",Planet_Select_Column.TerrainBias="terrain_bias",Planet_Select_Column.TerrainHexPaletteId="terrain_hex_palette_id",Planet_Select_Column.TextureResolution="texture_resolution"}(exports.Planet_Select_Column||(exports.Planet_Select_Column={})),function(Planet_Update_Column){Planet_Update_Column.AtmosphericDistance="atmospheric_distance",Planet_Update_Column.CelestialId="celestial_id",Planet_Update_Column.Id="id",Planet_Update_Column.Name="name",Planet_Update_Column.OwnerId="owner_id",Planet_Update_Column.Radius="radius",Planet_Update_Column.TerrainBias="terrain_bias",Planet_Update_Column.TerrainHexPaletteId="terrain_hex_palette_id",Planet_Update_Column.TextureResolution="texture_resolution"}(exports.Planet_Update_Column||(exports.Planet_Update_Column={})),function(Planetary_Ring_Constraint){Planetary_Ring_Constraint.PlanetaryRingPkey="planetary_ring_pkey"}(exports.Planetary_Ring_Constraint||(exports.Planetary_Ring_Constraint={})),function(Planetary_Ring_Select_Column){Planetary_Ring_Select_Column.Colors="colors",Planetary_Ring_Select_Column.Id="id",Planetary_Ring_Select_Column.InnerRadius="inner_radius",Planetary_Ring_Select_Column.OuterRadius="outer_radius",Planetary_Ring_Select_Column.Resolution="resolution",Planetary_Ring_Select_Column.Rotation="rotation",Planetary_Ring_Select_Column.TerrainBias="terrain_bias",Planetary_Ring_Select_Column.Type="type"}(exports.Planetary_Ring_Select_Column||(exports.Planetary_Ring_Select_Column={})),function(Planetary_Ring_Update_Column){Planetary_Ring_Update_Column.Colors="colors",Planetary_Ring_Update_Column.Id="id",Planetary_Ring_Update_Column.InnerRadius="inner_radius",Planetary_Ring_Update_Column.OuterRadius="outer_radius",Planetary_Ring_Update_Column.Resolution="resolution",Planetary_Ring_Update_Column.Rotation="rotation",Planetary_Ring_Update_Column.TerrainBias="terrain_bias",Planetary_Ring_Update_Column.Type="type"}(exports.Planetary_Ring_Update_Column||(exports.Planetary_Ring_Update_Column={})),function(Playable_Race_Constraint){Playable_Race_Constraint.PlayableRacePkey="playable_race_pkey"}(exports.Playable_Race_Constraint||(exports.Playable_Race_Constraint={})),function(Playable_Race_Select_Column){Playable_Race_Select_Column.Description="description",Playable_Race_Select_Column.Id="id",Playable_Race_Select_Column.Name="name"}(exports.Playable_Race_Select_Column||(exports.Playable_Race_Select_Column={})),function(Playable_Race_Update_Column){Playable_Race_Update_Column.Description="description",Playable_Race_Update_Column.Id="id",Playable_Race_Update_Column.Name="name"}(exports.Playable_Race_Update_Column||(exports.Playable_Race_Update_Column={})),function(Terrain_Hex_Palette_Constraint){Terrain_Hex_Palette_Constraint.TerrainHexPaletteNameKey="terrain_hex_palette_name_key",Terrain_Hex_Palette_Constraint.TerrainHexPalettePkey="terrain_hex_palette_pkey"}(exports.Terrain_Hex_Palette_Constraint||(exports.Terrain_Hex_Palette_Constraint={})),function(Terrain_Hex_Palette_Select_Column){Terrain_Hex_Palette_Select_Column.Forest="forest",Terrain_Hex_Palette_Select_Column.Grass="grass",Terrain_Hex_Palette_Select_Column.Id="id",Terrain_Hex_Palette_Select_Column.Name="name",Terrain_Hex_Palette_Select_Column.Sand="sand",Terrain_Hex_Palette_Select_Column.Water="water"}(exports.Terrain_Hex_Palette_Select_Column||(exports.Terrain_Hex_Palette_Select_Column={})),function(Terrain_Hex_Palette_Update_Column){Terrain_Hex_Palette_Update_Column.Forest="forest",Terrain_Hex_Palette_Update_Column.Grass="grass",Terrain_Hex_Palette_Update_Column.Id="id",Terrain_Hex_Palette_Update_Column.Name="name",Terrain_Hex_Palette_Update_Column.Sand="sand",Terrain_Hex_Palette_Update_Column.Water="water"}(exports.Terrain_Hex_Palette_Update_Column||(exports.Terrain_Hex_Palette_Update_Column={})),function(User_Info_Constraint){User_Info_Constraint.UserInfoDisplayNameKey="user_info_display_name_key",User_Info_Constraint.UserPkey="user_pkey"}(exports.User_Info_Constraint||(exports.User_Info_Constraint={})),function(User_Info_Select_Column){User_Info_Select_Column.AvatarUrl="avatar_url",User_Info_Select_Column.DisplayName="display_name",User_Info_Select_Column.Id="id",User_Info_Select_Column.Name="name",User_Info_Select_Column.Nickname="nickname",User_Info_Select_Column.SecretSettingTest="secret_setting_test"}(exports.User_Info_Select_Column||(exports.User_Info_Select_Column={})),function(User_Info_Update_Column){User_Info_Update_Column.AvatarUrl="avatar_url",User_Info_Update_Column.DisplayName="display_name",User_Info_Update_Column.Id="id",User_Info_Update_Column.Name="name",User_Info_Update_Column.Nickname="nickname",User_Info_Update_Column.SecretSettingTest="secret_setting_test"}(exports.User_Info_Update_Column||(exports.User_Info_Update_Column={})),function(User_Me_Select_Column){User_Me_Select_Column.DisplayName="display_name",User_Me_Select_Column.Id="id",User_Me_Select_Column.Name="name",User_Me_Select_Column.Nickname="nickname",User_Me_Select_Column.SecretSettingTest="secret_setting_test"}(exports.User_Me_Select_Column||(exports.User_Me_Select_Column={})),function(User_Private_Select_Column){User_Private_Select_Column.SecretSettingTest="secret_setting_test",User_Private_Select_Column.UserId="user_id"}(exports.User_Private_Select_Column||(exports.User_Private_Select_Column={})),exports.CelestialFieldsFragmentDoc=client_1.gql`
    fragment CelestialFields on celestial {
  id
  name
  owner_id
  user_info {
    display_name
    name
  }
}
    `,exports.GalaxyFieldsFragmentDoc=client_1.gql`
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
    user_id
    id
  }
  celestials {
    ...CelestialFields
  }
}
    ${exports.CelestialFieldsFragmentDoc}`,exports.CelestialByIdDocument=client_1.gql`
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
  }
}
    `,exports.CelestialsDocument=client_1.gql`
    subscription Celestials {
  celestial {
    ...CelestialFields
  }
}
    ${exports.CelestialFieldsFragmentDoc}`,exports.CelestialsByGalaxyIdDocument=client_1.gql`
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
    `,exports.CreateEmpireOriginCelestialDocument=client_1.gql`
    mutation CreateEmpireOriginCelestial($galaxy_id: String!) {
  createEmpireOriginCelestial(galaxy_id: $galaxy_id) {
    insertedCelestialId
    insertedCelestialName
  }
}
    `,exports.TryInsertClaimedCelestialDocument=client_1.gql`
    mutation TryInsertClaimedCelestial($galaxy_id: uuid!, $id: String!, $name: String!, $owner_id: String!) {
  insert_celestial_one(
    object: {galaxy_id: $galaxy_id, id: $id, name: $name, owner_id: $owner_id}
    on_conflict: {constraint: system_pkey, update_columns: owner_id}
  ) {
    galaxy_id
    id
    name
    owner_id
  }
}
    `,exports.CharacterDataDocument=client_1.gql`
    query CharacterData {
  playable_race {
    description
    id
    name
  }
  faction {
    description
    id
    name
  }
  background {
    description
    id
    name
  }
}
    `,exports.GetChatMessagesDocument=client_1.gql`
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
    `,exports.LatestMessageDocument=client_1.gql`
    subscription LatestMessage {
  chat_message(limit: 1, order_by: {timestamp: desc}) {
    id
    message
  }
}
    `,exports.SendNewMessageDocument=client_1.gql`
    mutation SendNewMessage($message: String) {
  insert_chat_message_one(object: {message: $message}) {
    message
  }
}
    `,exports.CreateGalacticEmpireDocument=client_1.gql`
    mutation CreateGalacticEmpire($input: galactic_empire_insert_input!) {
  insert_galactic_empire_one(object: $input) {
    id
  }
}
    `,exports.GalacticEmpireByIdDocument=client_1.gql`
    subscription GalacticEmpireById($id: uuid!) {
  galactic_empire(where: {id: {_eq: $id}}) {
    galaxy {
      name
    }
    homeworld {
      name
      terrain_hex_palette_id
      texture_resolution
      id
    }
    background {
      name
      description
      id
    }
    celestials {
      name
      id
      galaxy_id
    }
    faction {
      description
      id
      name
    }
  }
}
    `,exports.GalacticEmpiresByGalaxyIdDocument=client_1.gql`
    query GalacticEmpiresByGalaxyId($galaxyId: uuid!) {
  galactic_empire(where: {galaxy_id: {_eq: $galaxyId}}) {
    user_id
    id
  }
}
    `,exports.CreateGalaxyDocument=client_1.gql`
    mutation CreateGalaxy($input: galaxy_insert_input!) {
  insert_galaxy_one(object: $input) {
    ...GalaxyFields
  }
}
    ${exports.GalaxyFieldsFragmentDoc}`,exports.DeleteGalaxyByIdDocument=client_1.gql`
    mutation DeleteGalaxyById($id: uuid!) {
  delete_galaxy_by_pk(id: $id) {
    id
    name
  }
}
    `,exports.GalaxiesDocument=client_1.gql`
    subscription Galaxies {
  galaxy {
    ...GalaxyFields
  }
}
    ${exports.GalaxyFieldsFragmentDoc}`,exports.GalaxiesWithOwnedCelestialsDocument=client_1.gql`
    subscription GalaxiesWithOwnedCelestials($userId: String!) {
  galaxy_aggregate(where: {celestials: {owner_id: {_eq: $userId}}}) {
    nodes {
      id
    }
  }
}
    `,exports.GalaxyByIdDocument=client_1.gql`
    query GalaxyById($id: uuid!) {
  galaxy_by_pk(id: $id) {
    ...GalaxyFields
  }
}
    ${exports.GalaxyFieldsFragmentDoc}`,exports.OngoingGalaxySessionsDocument=client_1.gql`
    subscription OngoingGalaxySessions($id: String!) {
  galaxy_aggregate(where: {celestials: {owner_id: {_eq: $id}}}) {
    nodes {
      id
      name
      celestials_aggregate(where: {owner_id: {_eq: $id}}) {
        nodes {
          id
          name
          planets_aggregate {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
    `,exports.GetGalaxyByIdAndUnclaimedCelestialsDocument=client_1.gql`
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
    `,exports.CreatePlanetDocument=client_1.gql`
    mutation CreatePlanet($input: PlanetCreationInput!) {
  createPlanet(input: $input) {
    createdPlanet {
      id
      name
      owner_id
    }
  }
}
    `,exports.PlanetByIdDocument=client_1.gql`
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
    }
  }
}
    `,exports.PlanetsByCelestialIdDocument=client_1.gql`
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
    `,exports.TerrainHexPalettesDocument=client_1.gql`
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
    `,exports.TryInsertPlanetDocument=client_1.gql`
    mutation TryInsertPlanet($input: planet_insert_input!) {
  insert_planet_one(object: $input) {
    id
    name
    owner_id
  }
}
    `,exports.SelfDocument=client_1.gql`
    query Self {
  user_me {
    display_name
    id
    name
    nickname
    secret_setting_test
  }
}
    `,exports.SetDisplayNameByUserIdDocument=client_1.gql`
    mutation SetDisplayNameByUserID($id: String!, $display_name: String!) {
  update_user_info_by_pk(
    pk_columns: {id: $id}
    _set: {display_name: $display_name}
  ) {
    display_name
  }
}
    `,exports.SetNameByUserIdDocument=client_1.gql`
    mutation SetNameByUserID($display_name: String = "") {
  setDisplayName(display_name: $display_name) {
    updatedName
  }
}
    `,exports.UserInfoDocument=client_1.gql`
    query UserInfo {
  user_info {
    avatar_url
    id
    name
    display_name
  }
}
    `},264:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});__webpack_require__(752).__exportStar(__webpack_require__(657),exports)},657:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.apolloBootstrapper=void 0;const client_1=__webpack_require__(114),ws_1=__webpack_require__(5),utilities_1=__webpack_require__(596);exports.apolloBootstrapper=(uri,secure,access,token,cacheConfig={},customFetch=fetch,customWs=WebSocket,options={})=>{const headers="user"===access?{Authorization:`Bearer ${token()}`}:{"x-hasura-admin-secret":`${token()}`},httpLink=(0,client_1.createHttpLink)({uri:`${secure?"https":"http"}://${uri}`,headers:{...headers},fetch:customFetch}),wsLink=new ws_1.WebSocketLink({uri:`${secure?"wss":"ws"}://${uri}`,options:{lazy:!0,reconnect:!0,connectionParams:async()=>({headers:{...headers}})},webSocketImpl:customWs}),link=(0,client_1.split)((({query})=>{const{kind,operation}=(0,utilities_1.getMainDefinition)(query);return"OperationDefinition"===kind&&"subscription"===operation}),wsLink,httpLink);return new client_1.ApolloClient({cache:new client_1.InMemoryCache(cacheConfig),link,defaultOptions:options,connectToDevTools:!0})}},114:module=>{module.exports=require("@apollo/client")},5:module=>{module.exports=require("@apollo/client/link/ws")},596:module=>{module.exports=require("@apollo/client/utilities")},297:module=>{module.exports=require("apollo-datasource")},55:module=>{module.exports=require("apollo-server-express")},167:module=>{module.exports=require("axios")},31:module=>{module.exports=require("cross-fetch")},860:module=>{module.exports=require("express")},779:module=>{module.exports=require("express-jwt")},835:module=>{module.exports=require("jwks-rsa")},569:module=>{module.exports=require("object-hash")},236:module=>{module.exports=require("reflect-metadata")},621:module=>{module.exports=require("seedrandom")},752:module=>{module.exports=require("tslib")},345:module=>{module.exports=require("type-graphql")},352:module=>{module.exports=require("ws")}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}var __webpack_exports__={};(()=>{var exports=__webpack_exports__;Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=__webpack_require__(752),graphql_utils_1=__webpack_require__(264),apollo_server_express_1=__webpack_require__(55),cross_fetch_1=tslib_1.__importDefault(__webpack_require__(31)),express_1=tslib_1.__importDefault(__webpack_require__(860)),express_jwt_1=tslib_1.__importDefault(__webpack_require__(779)),jwks_rsa_1=tslib_1.__importDefault(__webpack_require__(835)),type_graphql_1=__webpack_require__(345),authChecker_1=__webpack_require__(409),auth0_1=__webpack_require__(712),hasura_api_1=__webpack_require__(760),celestial_management_1=__webpack_require__(659),galaxy_management_1=__webpack_require__(839),register_1=__webpack_require__(545),ws=__webpack_require__(352);(async()=>{const client=(0,graphql_utils_1.apolloBootstrapper)(process.env.HASURA_URI,"secure"===process.env.SECURE_HASURA,"admin-secret",(()=>process.env.HASURA_ADMIN_SECRET),{},cross_fetch_1.default,ws,{query:{fetchPolicy:"no-cache"},mutate:{fetchPolicy:"no-cache"}}),schema=await(0,type_graphql_1.buildSchema)({resolvers:[register_1.RegisterResolver,galaxy_management_1.GalaxyManagementResolver,celestial_management_1.CelestialManagementResolver],authChecker:authChecker_1.authChecker,emitSchemaFile:!0}),app=(0,express_1.default)(),server=new apollo_server_express_1.ApolloServer({schema,context:({req})=>{const context={req,user:req.user};return req.user&&context.req.user[process.env.HASURA_NAMESPACE]&&(context.req.user[process.env.HASURA_NAMESPACE]["x-hasura-allowed-roles"]&&(context.roles=context.req.user[process.env.HASURA_NAMESPACE]["x-hasura-allowed-roles"]),context.req.user[process.env.HASURA_NAMESPACE]["x-hasura-user-id"]&&(context.id=context.req.user[process.env.HASURA_NAMESPACE]["x-hasura-user-id"])),context},dataSources:()=>({hasuraAPI:new hasura_api_1.HasuraAPI(client),auth0API:new auth0_1.Auth0API}),introspection:!0});app.use("/graphql",(0,express_jwt_1.default)({credentialsRequired:!1,secret:jwks_rsa_1.default.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`}),audience:process.env.AUTH0_CLIENT_ID,issuer:[`https://${process.env.AUTH0_DOMAIN}/`],algorithms:["RS256"]})),await server.start(),server.applyMiddleware({app,path:"/graphql"}),app.listen({port:process.env.PORT||4e3},(()=>console.log(`🚀 Idleverse Game Server ready at http://localhost:${process.env.PORT||4e3}${server.graphqlPath}`)))})()})();var __webpack_export_target__=exports;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();