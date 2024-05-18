-- name: GetGenerators :many
SELECT empire_generators.galactic_empire_id,
    empire_generators.count,
    generator_type.generation_rate,
    generator_type.name AS generator_name,
    resource_1.type AS resource_1_name,
    empire_resource_1.id AS resource_1_id,
    empire_resource_1.value AS resource_1_val,
    resource_2.type AS resource_1_name,
    empire_resource_2.id AS resource_2_id,
    empire_resource_2.value AS resource_2_val
FROM galactic_empire_resource_generator AS empire_generators
    INNER JOIN resource_generator AS generator_type ON empire_generators.generator_type_id = generator_type.id
    INNER JOIN galactic_empire_resources AS empire_resource_1 ON generator_type.resource_type_1_id = empire_resource_1.resource_type_id
    LEFT JOIN galactic_empire_resources AS empire_resource_2 ON generator_type.resource_type_2_id = empire_resource_2.resource_type_id
    INNER JOIN resource_type AS resource_1 ON generator_type.resource_type_1_id = resource_1.id
    LEFT JOIN resource_type AS resource_2 ON generator_type.resource_type_2_id = resource_2.id;
-- most generators don't have a second resource type, but it is possible