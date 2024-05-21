-- name: RunGeneration :exec
UPDATE galactic_empire_resources AS er
SET value = value + (rg.generation_rate [1] * ger.count)
FROM galactic_empire_resource_generator AS ger
    JOIN resource_generator AS rg ON ger.generator_type_id = rg.id
WHERE er.galactic_empire_id = ger.galactic_empire_id
    AND er.resource_type_id = rg.resource_type_1_id;
UPDATE galactic_empire_resources AS er
SET value = value + (rg.generation_rate [2] * ger.count)
FROM galactic_empire_resource_generator AS ger
    JOIN resource_generator AS rg ON ger.generator_type_id = rg.id
WHERE er.galactic_empire_id = ger.galactic_empire_id
    AND er.resource_type_id = rg.resource_type_2_id
    AND rg.generation_rate [2] IS NOT NULL;