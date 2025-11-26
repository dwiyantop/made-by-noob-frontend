"use client";

import { Heading } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import type { PetPassive } from "@/app/grow-a-garden/_repositories/pet/pet-passives/pet-passives-type";

interface PassiveAbilityItemProps {
  passive: PetPassive;
}

export function PassiveAbilityItem({ passive }: PassiveAbilityItemProps) {
  return (
    <div className="space-y-2">
      {passive.name && (
        <Heading variant="h3" className="text-lg">
          {passive.name}
        </Heading>
      )}
      {passive.descriptionWithStates &&
      passive.descriptionWithStates.trim().length > 0 ? (
        <Paragraph className="text-text-secondary">
          {passive.descriptionWithStates}
        </Paragraph>
      ) : (
        <Paragraph className="text-text-secondary italic">
          No description
        </Paragraph>
      )}
    </div>
  );
}
