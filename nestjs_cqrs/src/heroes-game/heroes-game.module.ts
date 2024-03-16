import { Module } from '@nestjs/common';
import { HeroesGameService } from './heroes-game.service';
import { HeroesGameController } from './heroes-game.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { KillDragonHandler } from './kill-dragon.handler';
export const CommandHandlers = [KillDragonHandler];
export const EventHandlers = [];

@Module({
  imports: [CqrsModule],
  providers: [HeroesGameService, ...CommandHandlers, ...EventHandlers],
  controllers: [HeroesGameController],
})
export class HeroesGameModule {}
