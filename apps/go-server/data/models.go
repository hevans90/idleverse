// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package idleversedata

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/sqlc-dev/pqtype"
)

// Playable backgrounds
type Background struct {
	ID          uuid.UUID
	Name        string
	Description string
	ImageUrl    sql.NullString
}

type Celestial struct {
	Name             sql.NullString
	GalaxyID         uuid.UUID
	OwnerID          sql.NullString
	ID               string
	GalacticEmpireID uuid.NullUUID
	FormingPoints    string
}

type ChatMessage struct {
	ID        uuid.UUID
	Message   string
	PosterID  string
	Timestamp time.Time
}

// NPC factions
type Faction struct {
	ID          uuid.UUID
	Name        string
	Description string
	ImageUrl    sql.NullString
}

type GalacticEmpire struct {
	ID              uuid.UUID
	UserID          string
	GalaxyID        uuid.UUID
	BackgroundID    uuid.UUID
	FactionID       uuid.UUID
	PlayableRaceID  uuid.UUID
	HomeworldID     uuid.NullUUID
	CelestialClaims int32
}

// NPCs unlocked for this empire
type GalacticEmpireNpc struct {
	NpcID            uuid.UUID
	ID               uuid.UUID
	GalacticEmpireID uuid.UUID
}

type GalacticEmpireQuest struct {
	ID               uuid.UUID
	GalacticEmpireID uuid.UUID
	QuestID          uuid.UUID
	Completed        bool
	QuestStepID      uuid.UUID
}

type GalacticEmpireResource struct {
	ResourceTypeID   uuid.UUID
	Value            int32
	UpdatedAt        time.Time
	ID               uuid.UUID
	GalacticEmpireID uuid.UUID
}

type GalacticEmpireResourceGenerator struct {
	ID               uuid.UUID
	CreatedAt        time.Time
	UpdatedAt        time.Time
	GalacticEmpireID uuid.UUID
	GeneratorTypeID  uuid.UUID
	PlanetID         uuid.NullUUID
	Count            string
}

type Galaxy struct {
	ID                      uuid.UUID
	Name                    sql.NullString
	Radius                  int32
	Arms                    string
	Curvature               string
	ArmWidth                string
	CoreRadiusFactor        string
	CoreConcentrationFactor string
	Stars                   int32
}

type HdbCatalogHdbActionLog struct {
	ID                 uuid.UUID
	ActionName         sql.NullString
	InputPayload       json.RawMessage
	RequestHeaders     json.RawMessage
	SessionVariables   json.RawMessage
	ResponsePayload    pqtype.NullRawMessage
	Errors             pqtype.NullRawMessage
	CreatedAt          time.Time
	ResponseReceivedAt sql.NullTime
	Status             string
}

type HdbCatalogHdbCronEvent struct {
	ID            string
	TriggerName   string
	ScheduledTime time.Time
	Status        string
	Tries         int32
	CreatedAt     sql.NullTime
	NextRetryAt   sql.NullTime
}

type HdbCatalogHdbCronEventInvocationLog struct {
	ID        string
	EventID   sql.NullString
	Status    sql.NullInt32
	Request   pqtype.NullRawMessage
	Response  pqtype.NullRawMessage
	CreatedAt sql.NullTime
}

type HdbCatalogHdbMetadatum struct {
	ID              int32
	Metadata        json.RawMessage
	ResourceVersion int32
}

type HdbCatalogHdbScheduledEvent struct {
	ID            string
	WebhookConf   json.RawMessage
	ScheduledTime time.Time
	RetryConf     pqtype.NullRawMessage
	Payload       pqtype.NullRawMessage
	HeaderConf    pqtype.NullRawMessage
	Status        string
	Tries         int32
	CreatedAt     sql.NullTime
	NextRetryAt   sql.NullTime
	Comment       sql.NullString
}

type HdbCatalogHdbScheduledEventInvocationLog struct {
	ID        string
	EventID   sql.NullString
	Status    sql.NullInt32
	Request   pqtype.NullRawMessage
	Response  pqtype.NullRawMessage
	CreatedAt sql.NullTime
}

type HdbCatalogHdbSchemaNotification struct {
	ID              int32
	Notification    json.RawMessage
	ResourceVersion int32
	InstanceID      uuid.UUID
	UpdatedAt       sql.NullTime
}

type HdbCatalogHdbVersion struct {
	HasuraUuid     uuid.UUID
	Version        string
	UpgradedOn     time.Time
	CliState       json.RawMessage
	ConsoleState   json.RawMessage
	EeClientID     sql.NullString
	EeClientSecret sql.NullString
}

// non-playable characters
type Npc struct {
	ID        uuid.UUID
	Name      string
	RaceID    uuid.NullUUID
	FactionID uuid.NullUUID
	ImageUrl  string
}

type Planet struct {
	ID                  uuid.UUID
	CelestialID         string
	Radius              string
	TextureResolution   int32
	TerrainBias         []string
	TerrainHexPaletteID uuid.UUID
	OwnerID             string
	Name                string
	AtmosphericDistance string
	OrbitalRadius       sql.NullString
}

type PlanetaryRing struct {
	ID          uuid.UUID
	Rotation    []string
	Type        string
	Colors      []string
	TerrainBias []string
	InnerRadius string
	OuterRadius string
	Resolution  int32
}

// Playable races
type PlayableRace struct {
	ID          uuid.UUID
	Name        string
	Description string
	ImageUrl    sql.NullString
}

type Quest struct {
	ID               uuid.UUID
	Name             string
	Description      string
	Type             string
	NextQuestInChain uuid.NullUUID
	Initial          sql.NullBool
	ImageUrl         sql.NullString
}

type QuestReward struct {
	ID                    uuid.UUID
	QuestID               uuid.UUID
	Type                  string
	ResourceAccrualTypeID uuid.NullUUID
	ResourceAccrualAmount sql.NullInt32
	NpcUnlockID           uuid.NullUUID
	ResourceUnlockID      uuid.NullUUID
}

type QuestRewardType struct {
	Value       string
	Description string
}

type QuestStep struct {
	ID                 uuid.UUID
	Description        string
	Type               string
	QuestID            uuid.UUID
	NpcContactID       uuid.NullUUID
	ResourceCostID     uuid.NullUUID
	ResourceCostAmount sql.NullInt32
	NextStepInQuest    uuid.NullUUID
	Initial            bool
}

type QuestStepType struct {
	Value       string
	Description string
}

type QuestType struct {
	Value string
}

type ResourceGenerator struct {
	ID                     uuid.UUID
	Name                   string
	Description            string
	GenerationRate         []string
	ImageUrl               sql.NullString
	ResourceType1ID        uuid.UUID
	ResourceType2ID        uuid.NullUUID
	UnlockedByTechnologyID uuid.NullUUID
	CostResourceTypeID1    uuid.UUID
	CostAmount1            string
	CostGrowthExponent     string
}

type ResourceType struct {
	ID            uuid.UUID
	Type          string
	ImageUrlPixel sql.NullString
	ImageUrl      sql.NullString
}

type Technology struct {
	ID           uuid.UUID
	Name         string
	Description  sql.NullString
	Children     []uuid.UUID
	Root         sql.NullBool
	ResearchCost int32
	ImageUrl     sql.NullString
}

type TerrainHexPalette struct {
	Water  string
	Sand   string
	Grass  string
	Forest string
	ID     uuid.UUID
	Name   string
}

type UserInfo struct {
	ID                string
	Nickname          string
	SecretSettingTest sql.NullString
	Name              sql.NullString
	DisplayName       sql.NullString
	FreeClaims        int32
	AvatarUrl         sql.NullString
}

type UserMe struct {
	ID                string
	Nickname          string
	SecretSettingTest sql.NullString
	Name              sql.NullString
	DisplayName       sql.NullString
	FreeClaims        int32
	AvatarUrl         sql.NullString
}

type UserPrivate struct {
	UserID            string
	SecretSettingTest sql.NullString
}
