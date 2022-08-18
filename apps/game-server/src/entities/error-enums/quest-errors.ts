export enum QuestErrorTypes {
  NoUserId = 'User id not in token',
  NoQuestToComplete = 'No quest to complete.',
  NoQuestToProgress = 'No quest to progress.',
  NoEmpire = 'No galactic empire found.',
  AlreadyCompleted = 'Quest already completed',
  NoStep = 'No quest step found.',
  NoNextStep = 'No next step in quest.',
  NoResourcesUnlocked = 'This empire has not yet unlocked any resources.',
  ResourceNotUnlocked = 'This empire has not yet unlocked the specified resource you tried to modify.',
  NotEnoughResources = "You don't have enough resources to spend!",
  InvalidResourceType = 'Resource type is not valid.',
}
