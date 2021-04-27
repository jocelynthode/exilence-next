﻿using MongoDB.Driver.Linq;
using Shared.Entities;
using Shared.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ISnapshotService
    {
        Task<List<SnapshotModel>> GetSnapshotsForProfile(string profileId);
        Task<SnapshotModel> GetSnapshot(string snapshotId);
        Task<SnapshotModel> AddSnapshot(string profileId, SnapshotModel snapshotModel);
        Task RemoveSnapshot(string snapshotId);
        Task RemoveAllSnapshots(string profileClientId);
    }
}