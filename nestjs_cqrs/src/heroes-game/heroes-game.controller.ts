import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './kill-dragon.command';

@Controller('heroes-game')
export class HeroesGameController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post(':id/kill')
  async killDragon(@Param('id') id: string, @Body() dto: any) {
    return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
  }
}
