import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function buildAbilityFor(authItems) {
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  authItems.forEach((item) => {
    can(item.action, item.subject);
  });

  return createMongoAbility(rules);
}

export function updateAbilityFor(ability, authItems) {
  ability.update(authItems);
  return ability;
}
